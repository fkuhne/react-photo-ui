import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Tags as chips (plan step 2.6, record 0004): React Aria's `TagGroup`, each tag a chip with a × that
// removes it, the arrows moving between them and Delete removing the one with the keys; a tag may
// act on a click too, as a tag on some photos only adds itself to them all. Drawn by
// `controls.css` in the `chip` colour.
import { useCallback } from "react";
import { Button, Tag, TagGroup, TagList } from "react-aria-components";
import { Icon } from "./Icon";
function Chip({ item, onAction, removeLabel }) {
    // React Aria passes no `title`: set on the element itself, as `Button` does.
    const titled = useCallback((element) => {
        if (element) {
            if (item.title)
                element.title = item.title;
            else
                element.removeAttribute("title");
        }
    }, [item.title]);
    return (_jsxs(Tag, { id: item.id, ref: titled, textValue: item.label, className: ["pu-tag", item.className].filter(Boolean).join(" "), onAction: item.acts && onAction ? () => onAction(item.id) : undefined, ...item.data, children: [_jsx("span", { className: "pu-tag-name", children: item.name }), _jsx(Button, { slot: "remove", className: "pu-tag-remove", "aria-label": removeLabel(item), ...item.removeData, children: _jsx(Icon, { name: "x" }) })] }));
}
export function Tags({ items, onRemove, onAction, removeLabel, className, ...aria }) {
    return (_jsx(TagGroup, { ...aria, onRemove: (keys) => keys.forEach((key) => onRemove(String(key))), className: ["pu-tags", className].filter(Boolean).join(" "), children: _jsx(TagList, { items: items, className: "pu-tag-list", children: (item) => _jsx(Chip, { item: item, onAction: onAction, removeLabel: removeLabel }) }) }));
}
