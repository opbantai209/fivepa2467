import React, { useState } from 'react';
import { Send, Paperclip } from 'lucide-react';

interface Props {
  counterpartyName: string;
  onSendMessage: (content: string) => void;
  onAttachFile: () => void;
}

export const WorkStreamComposer: React.FC<Props> = ({
  counterpartyName,
  onSendMessage,
  onAttachFile,
}) => {
  const [text, setText] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSendMessage(text.trim());
    setText('');
  };

  return (
    <form onSubmit={submit} className="p-3 border-t border-slate-200 bg-white rounded-b-xl">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onAttachFile}
          className="p-2 text-slate-500 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors shrink-0"
          title="Attach File"
        >
          <Paperclip className="w-4 h-4" />
        </button>

        <input
          type="text"
          placeholder={`Write message to ${counterpartyName}...`}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-orange-500"
        />

        <button
          type="submit"
          disabled={!text.trim()}
          className={`p-2.5 rounded-lg text-white font-medium transition-all shrink-0 ${
            text.trim() ? 'bg-orange-500 hover:bg-orange-600' : 'bg-slate-300 cursor-not-allowed'
          }`}
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
};
