import React from 'react';
import { useParams } from 'react-router-dom';
import { useDiaryStore } from '../../stores/diaryStore';
import { format } from 'date-fns';

const EntryDetailView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getEntry } = useDiaryStore();
  const entry = getEntry(id || '');

  if (!entry) {
    return <div>Entry not found</div>;
  }

  return (
    <div className="bg-cream-paper p-8 md:p-12 rounded-lg shadow-paper max-w-4xl mx-auto my-8 font-serif">
      <div className="border-b-2 border-notebook-lines pb-4 mb-6">
        <h1 className="text-4xl font-script text-fountain-pen-blue">
          {format(new Date(entry.date), 'MMMM d, yyyy')}
        </h1>
      </div>
      <div
        className="prose prose-lg text-pencil-graphite"
        dangerouslySetInnerHTML={{ __html: entry.content }}
      />
    </div>
  );
};

export default EntryDetailView;