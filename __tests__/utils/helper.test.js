import { convertNotesToTree } from '../../src/utils/helper';

describe('convertNotesToTree', () => {
  it('should return null if no notes are present', () => {
    expect(convertNotesToTree()).toBeNull();
  });

  it('should return null if no notes have the given parentId', () => {
    const notes = [{ id: 1, parent_id: 2, title: 'test' }];
    expect(convertNotesToTree(notes, 3)).toBeNull();
  });

  it('should return an array of notes with the given parentId, sorted by sorting', () => {
    const notes = [
      { id: 1, parent_id: null, title: 'test1', sorting: 1, is_folder: true },
      { id: 2, parent_id: null, title: 'test2', sorting: 2 },
      { id: 3, parent_id: 1, title: 'test3', sorting: 1 },
    ];
    const result = convertNotesToTree(notes, null);
    expect(result).toEqual([
      { id: 1, name: 'test1', children: [{ id: 3, name: 'test3' }] },
      { id: 2, name: 'test2' },
    ]);
  });

  it('should return newNotes with correct structure', () => {
    const notes = [
      { id: 1, title: 'Note 1', parent_id: null, is_folder: false, sorting: 1 },
      { id: 2, title: 'Folder 1', parent_id: null, is_folder: true, sorting: 2 },
      { id: 3, title: 'Note 2', parent_id: 2, is_folder: false, sorting: 1 },
    ];

    const expectedResult = [
      { id: 1, name: 'Note 1' },
      {
        id: 2,
        name: 'Folder 1',
        children: [{ id: 3, name: 'Note 2' }],
      },
    ];

    expect(convertNotesToTree(notes)).toEqual(expectedResult);
  });
});
