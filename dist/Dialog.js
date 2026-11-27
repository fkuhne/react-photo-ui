import { jsx as _jsx } from "react/jsx-runtime";
import { Dialog as AriaDialog, Heading, Modal, ModalOverlay } from "react-aria-components";
/** A dialog over the app, open while it's shown: an app shows it, and takes it away in `onClose`. */
export function Dialog({ onClose, className, children, isKeyboardDismissDisabled, ...aria }) {
    return (_jsx(ModalOverlay, { isOpen: true, isDismissable: true, isKeyboardDismissDisabled: isKeyboardDismissDisabled, onOpenChange: (open) => {
            if (!open)
                onClose();
        }, className: "pu-dialog-scrim", children: _jsx(Modal, { className: "pu-dialog", children: _jsx(AriaDialog, { ...aria, className: ["pu-dialog-frame", className].filter(Boolean).join(" "), children: children }) }) }));
}
/** A dialog's title, which names it for a screen reader too. */
export function DialogTitle({ children, className }) {
    return (_jsx(Heading, { slot: "title", className: ["pu-dialog-title", className].filter(Boolean).join(" "), children: children }));
}
