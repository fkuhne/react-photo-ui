// Tags as chips (plan step 2.6, record 0004): React Aria's `TagGroup`, each tag a chip with a × that
// removes it, the arrows moving between them and Delete removing the one with the keys; a tag may
// act on a click too, as a tag on some photos only adds itself to them all. Drawn by
// `controls.css` in the `chip` colour.
import { useCallback, type ReactNode } from "react";
import { Button, Tag, TagGroup, TagList } from "react-aria-components";
import { Icon } from "./Icon";

export interface TagItem {
  id: string;
  /** What the chip shows. */
  name: ReactNode;
  /** What it's called, for a screen reader and the keys' type-ahead. */
  label: string;
  /** The system's tooltip. */
  title?: string;
  /** Whether a click on it acts, by `onAction`. */
  acts?: boolean;
  /** Classes and attributes for the app's look and checks, on the chip and on its ×. */
  className?: string;
  data?: Record<`data-${string}`, string>;
  removeData?: Record<`data-${string}`, string>;
}

export interface TagsProps {
  "aria-label": string;
  items: TagItem[];
  onRemove: (id: string) => void;
  onAction?: (id: string) => void;
  /** The ×'s name for a screen reader: "Remove Travel". */
  removeLabel: (item: TagItem) => string;
  className?: string;
}

function Chip({ item, onAction, removeLabel }: { item: TagItem; onAction?: (id: string) => void; removeLabel: (item: TagItem) => string }) {
  // React Aria passes no `title`: set on the element itself, as `Button` does.
  const titled = useCallback(
    (element: HTMLDivElement | null) => {
      if (element) {
        if (item.title) element.title = item.title;
        else element.removeAttribute("title");
      }
    },
    [item.title],
  );
  return (
    <Tag
      id={item.id}
      ref={titled}
      textValue={item.label}
      className={["pu-tag", item.className].filter(Boolean).join(" ")}
      onAction={item.acts && onAction ? () => onAction(item.id) : undefined}
      {...item.data}
    >
      <span className="pu-tag-name">{item.name}</span>
      <Button slot="remove" className="pu-tag-remove" aria-label={removeLabel(item)} {...item.removeData}>
        <Icon name="x" />
      </Button>
    </Tag>
  );
}

export function Tags({ items, onRemove, onAction, removeLabel, className, ...aria }: TagsProps) {
  return (
    <TagGroup {...aria} onRemove={(keys) => keys.forEach((key) => onRemove(String(key)))} className={["pu-tags", className].filter(Boolean).join(" ")}>
      <TagList items={items} className="pu-tag-list">
        {(item) => <Chip item={item} onAction={onAction} removeLabel={removeLabel} />}
      </TagList>
    </TagGroup>
  );
}
