// Draws pages of the site in WebKit, off screen, and saves each as a PNG: the site as Tauri's
// macOS webview draws it, for a step to show what it built. macOS only, with Xcode's Command Line
// Tools. Each page is "<address> <theme button, 0 System, 1 Dark, 2 Light, 3 Paper> <name>"; give
// each address its own query, as a change after # alone isn't a new page to WebKit:
//
//   npx vite build --base ./ --outDir /tmp/photo-ui-site && npx vite preview --outDir /tmp/photo-ui-site --port 4178 &
//   swiftc -O scripts/snapshot.swift -o /tmp/snapshot
//   /tmp/snapshot /tmp "http://localhost:4178/?p=1#/icons 2 icons-light" …
import AppKit
import WebKit

final class Snapper: NSObject, WKNavigationDelegate {
    let out: URL
    var jobs: [(url: URL, theme: Int, name: String)]
    let view: WKWebView

    init(out: URL, jobs: [(URL, Int, String)]) {
        self.out = out
        self.jobs = jobs
        view = WKWebView(frame: NSRect(x: 0, y: 0, width: 1280, height: 820))
        super.init()
        view.navigationDelegate = self
    }

    func next() {
        guard let job = jobs.first else { NSApp.terminate(nil); return }
        view.load(URLRequest(url: job.url))
    }

    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        let job = jobs.removeFirst()
        // The theme by the site's own buttons, then a moment to draw.
        let pick = "document.querySelectorAll('[aria-label=\"Theme\"] button')[\(job.theme)]?.click();"
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.6) {
            webView.evaluateJavaScript(pick) { _, _ in
                DispatchQueue.main.asyncAfter(deadline: .now() + 0.6) {
                    webView.takeSnapshot(with: nil) { image, error in
                        if let image, let tiff = image.tiffRepresentation, let rep = NSBitmapImageRep(data: tiff), let png = rep.representation(using: .png, properties: [:]) {
                            try? png.write(to: self.out.appendingPathComponent("\(job.name).png"))
                            print("saved \(job.name).png")
                        } else {
                            print("no snapshot for \(job.name): \(String(describing: error))")
                        }
                        self.next()
                    }
                }
            }
        }
    }
}

let args = CommandLine.arguments.dropFirst()
let out = URL(fileURLWithPath: args.first!)
let jobs: [(URL, Int, String)] = args.dropFirst().map { spec in
    let parts = spec.split(separator: " ")
    return (URL(string: String(parts[0]))!, Int(parts[1])!, String(parts[2]))
}
let app = NSApplication.shared
app.setActivationPolicy(.prohibited)
let snapper = Snapper(out: out, jobs: jobs)
snapper.next()
app.run()
