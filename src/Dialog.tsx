// A dialog (plan step 2.4, record 0004): React Aria's `ModalOverlay`, `Modal` and `Dialog`, drawn by
// `controls.css`: the app dimmed behind a scrim, the dialog a panel with 6 px corners and its shadow,
// focus kept inside it while it's open and given back after. A click on the scrim closes it; Esc
// does too, unless the app's own keys handle Esc, as PhotoMatch's do, by `isKeyboardDismissDisabled`.
// Its content is the app's: a title, a body, a foot of buttons, as the dialog needs.
import type { ReactNode } from "react";
import { Dialog as AriaDialog, Heading, Modal, ModalOverlay } from "react-aria-components";

export interface DialogProps {
  /** Called when the scrim is clicked, or Esc pressed unless the app keeps Esc. */
  onClose: () => void;
  /** What it's called, for a screen reader, when no `DialogTitle` names it. */
  "aria-label"?: string;
  /** The app keeps Esc: its own keys close the dialog. */
  isKeyboardDismissDisabled?: boolean;
  /** Classes on the dialog's box, for the app's layout. */
  className?: string;
  children: ReactNode;
}

/** A dialog over the app, open while it's shown: an app shows it, and takes it away in `onClose`. */
export function Dialog({ onClose, className, children, isKeyboardDismissDisabled, ...aria }: DialogProps) {
  return (
    <ModalOverlay
      isOpen
      isDismissable
      isKeyboardDismissDisabled={isKeyboardDismissDisabled}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      className="pu-dialog-scrim"
    >
      <Modal className={["pu-dialog", className].filter(Boolean).join(" ")}>
        <AriaDialog {...aria} className="pu-dialog-frame">
          {children}
        </AriaDialog>
      </Modal>
    </ModalOverlay>
  );
}

/** A dialog's title, which names it for a screen reader too. */
export function DialogTitle({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <Heading slot="title" className={["pu-dialog-title", className].filter(Boolean).join(" ")}>
      {children}
    </Heading>
  );
}
