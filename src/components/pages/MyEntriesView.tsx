import React from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { useDiaryStore } from '../../stores/diaryStore';

const MyEntriesView: React.FC = () => {
  const { entries } = useDiaryStore();

  return (
    <div className="bg-aged-paper p-8 md:p-12 rounded-lg shadow-paper max-w-4xl mx-auto my-8 font-serif">
      <h1 className="text-4xl font-script text-fountain-pen-blue mb-8">My Entries</h1>
      <div className="space-y-6">
        {entries.map((entry) => (
          <div key={entry.id} className="bg-cream-paper p-6 rounded-lg shadow-paper">
            <h2 className="text-2xl font-script text-fountain-pen-blue">
              {format(new Date(entry.date), 'MMMM d, yyyy')}
            </h2>
            <div
              className="prose prose-lg max-h-48 overflow-hidden text-pencil-graphite"
              dangerouslySetInnerHTML={{ __html: entry.content }}
            />
            <Link
              to={`/entries/${entry.id}`}
              className="text-fountain-pen-blue hover:underline mt-4 inline-block"
            >
              Read More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyEntriesView;