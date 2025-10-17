import React, { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { format } from 'date-fns';
import { useDiaryStore, getOrCreateTodaysEntry } from '../../stores/diaryStore';
import type { DiaryEntry } from '../../types';

const WriteView: React.FC = () => {
  const [entry, setEntry] = useState<DiaryEntry | null>(null);
  const { updateEntry } = useDiaryStore();

  const editor = useEditor({
    extensions: [StarterKit],
    content: '',
    editorProps: {
      attributes: {
        class: 'prose prose-lg focus:outline-none w-full max-w-full text-pencil-graphite',
      },
    },
    onUpdate: ({ editor }) => {
      if (entry) {
        updateEntry(entry.id, { content: editor.getHTML() });
      }
    },
  });

  useEffect(() => {
    const loadEntry = async () => {
      const todaysEntry = await getOrCreateTodaysEntry();
      setEntry(todaysEntry);
      if (editor && todaysEntry.content) {
        editor.commands.setContent(todaysEntry.content);
      }
    };
    loadEntry();
  }, [editor]);

  if (!entry) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-cream-paper p-8 md:p-12 rounded-lg shadow-paper max-w-4xl mx-auto my-8 font-serif">
      <div className="border-b-2 border-notebook-lines pb-4 mb-6">
        <h1 className="text-4xl font-script text-fountain-pen-blue w-full bg-transparent focus:outline-none">
          {format(entry.date, 'MMMM d, yyyy')}
        </h1>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};

export default WriteView;