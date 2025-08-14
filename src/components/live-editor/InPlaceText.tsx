import React, { useEffect, useRef } from "react";
import { useLiveEditor } from "./LiveEditorProvider";

interface Props {
  id: string;
  children: React.ReactNode;
  className?: string;
}

const InPlaceText: React.FC<Props> = ({ id, children, className }) => {
  const { editMode, getTextDraft, setTextDraft } = useLiveEditor();
  const ref = useRef<HTMLSpanElement>(null);

  // On mount/update, if we have a draft override, reflect it visually
  useEffect(() => {
    if (!ref.current) return;
    if (editMode) return; // don't override while editing
    const draft = getTextDraft(id, "");
    if (draft && ref.current.innerText !== draft) {
      ref.current.innerText = draft;
    }
  }, [editMode, getTextDraft, id]);

  return (
    <span
      ref={ref}
      className={className}
      contentEditable={editMode}
      suppressContentEditableWarning
      data-live-text-id={id}
      onInput={(e) => setTextDraft(id, (e.currentTarget as HTMLElement).innerText)}
      style={editMode ? { outline: "1px dashed hsl(var(--primary))", borderRadius: 4, paddingInline: 2 } : undefined}
    >
      {children}
    </span>
  );
};

export default InPlaceText;