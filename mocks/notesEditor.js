import React from 'react';

const file = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
    />
  </svg>
);

const openFolder = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776"
    />
  </svg>
);

const closeFolder = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
    />
  </svg>
);

const arrowRight = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="w-4 h-4"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);

const arrowDown = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="w-4 h-4"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
);

const removeIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const renameIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
    />
  </svg>
);
const plus = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);
const importIcon = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    strokeWidth="1.5"
    className="w-6 h-6"
  >
    <path
      d="M22.9981 1L13.9785 10.0196"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.0996 5.58594V10.8987H18.4124"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.8996 1H8.69967C3.19991 1 1 3.19991 1 8.69967V15.2994C1 20.7992 3.19991 22.9991 8.69967 22.9991H15.2994C20.7992 22.9991 22.9991 20.7992 22.9991 15.2994V13.0995"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const exportIcon = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    strokeWidth="1.5"
    className="w-6 h-6"
  >
    <path
      id="Vector"
      d="M13.1016 10.8989L22.1216 1.87891"
      stroke="currentColor"
      strokeWidth="1.35"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      id="Vector_2"
      d="M22.9987 6.28V1H17.7188"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      id="Vector_3"
      d="M10.9 1H8.7C3.2 1 1 3.2 1 8.7V15.3C1 20.8 3.2 23 8.7 23H15.3C20.8 23 23 20.8 23 15.3V13.1"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const dots = (
  <div className="flex items-center justify-center w-6 h-6 space-x-1">
    {[...Array(3).keys()].map((key) => (
      <div key={key} className="h-1 w-1 bg-white rounded-full" />
    ))}
  </div>
);
const close = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);
const left = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
    />
  </svg>
);
export const icons = {
  file,
  arrowDown,
  arrowRight,
  openFolder,
  closeFolder,
  renameIcon,
  removeIcon,
  plus,
  importIcon,
  exportIcon,
  dots,
  close,
  left,
};

export const notes = [
  {
    id: 'first_note_key_from_DB',
    title: 'note1',
    user_id: 1,
    data: {
      time: 1550476186479,
      blocks: [
        {
          id: 'zbGZFPM-iI',
          type: 'paragraph',
          data: {
            text: 'Hey. Meet the new Editor. On this page you can see it in action — try to edit this text. Source code of the page contains the example of connection and configuration.',
          },
        },
      ],
      version: '2.29.1',
    },
    created_at: new Date('2024-03-29 07:59:58.3642'),
    is_folder: false,
    parent_id: 'second_note_key_from_DB',
  },
  {
    id: 'second_note_key_from_DB',
    user_id: 1,
    title: 'note2',
    data: {
      time: 1550476186479,
      blocks: [
        {
          id: 'zbGZFPM-iI',
          type: 'paragraph',
          data: {
            text: 'Designed to be extendable and pluggable with a simple API',
          },
        },
      ],
      version: '2.29.1',
    },
    created_at: new Date('2024-03-28 07:59:58.3642'),
    is_folder: true,
    parent_id: null,
  },
];

export const classes = {
  container: 'relative',
  back: 'flex w-fit p-1 cursor-pointer hover:opacity-70 rounded-full bg-gray-300',
  redactor: {
    title: 'p-2 my-4 font-bold rounded-lg shadow-md',
    redactor: 'pb-20 pt-4 px-4 my-4 overflow-hidden break-words rounded-lg shadow-md',
  },
  treeView: {
    nodeWrapper: 'flex px-5 leading-[47px] text-lg cursor-pointer rounded-lg',
    nodeTextBlock: 'items-center truncate',
  },
  search: {
    input:
      'py-2 text-black border-gray focus:border-gray placeholder:text-gray flex-1 px-4 w-full text-sm md:text-base rounded-lg border focus:outline-none',
    container: 'relative flex items-center mb-4',
    close: 'absolute р-6 w-6 right-1 z-10 cursor-pointer',
  },
};
