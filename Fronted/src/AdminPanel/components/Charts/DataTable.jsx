import React from 'react';

export default function DataTable({columns, rows}) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <table className="w-full">
        <thead className="text-sm text-gray-500">
          <tr>{columns.map(c=> <th key={c.key} className="py-2">{c.title}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((r,i)=>(
            <tr key={i} className="border-t">
              {columns.map(c=> <td key={c.key} className="py-3">{r[c.key]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
