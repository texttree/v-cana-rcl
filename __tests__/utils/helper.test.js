import {
  convertNotesToTree,
  generateUniqueId,
  removeIdsFromTree,
  buildTree,
} from '../../src/utils/helper';

/**
 * Test suite for the `convertNotesToTree` function.
 * This function converts an array of notes into a tree structure.
 */
describe('convertNotesToTree', () => {
  it('should return null if no notes are present', () => {
    expect(convertNotesToTree()).toBeNull();
  });

  it('should return null if no notes have the given parentId', () => {
    const notes = [{ id: 1, parent_id: 2, title: 'test' }];
    expect(convertNotesToTree(notes, 3)).toBeNull();
  });

  it('should return an array of notes with the given parentId, sorted by sorting', () => {
    // Arrange
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
    // Arrange
    const notes = [
      { id: 1, title: 'Note 1', parent_id: null, is_folder: true, sorting: 0 },
      { id: 2, title: 'Note 2', parent_id: null, is_folder: false, sorting: 1 },
      { id: 3, title: 'Note 3', parent_id: 1, is_folder: false, sorting: 0 },
      { id: 4, title: 'Note 4', parent_id: 1, is_folder: true, sorting: 1 },
      { id: 5, title: 'Note 5', parent_id: 4, is_folder: false, sorting: 0 },
      { id: 6, title: 'Note 6', parent_id: 4, is_folder: true, sorting: 1 },
      { id: 7, title: 'Note 7', parent_id: 6, is_folder: false, sorting: 0 },
    ];

    const expectedResult = [
      {
        id: 1,
        name: 'Note 1',
        children: [
          { id: 3, name: 'Note 3' },
          {
            id: 4,
            name: 'Note 4',
            children: [
              { id: 5, name: 'Note 5' },
              { id: 6, name: 'Note 6', children: [{ id: 7, name: 'Note 7' }] },
            ],
          },
        ],
      },
      { id: 2, name: 'Note 2' },
    ];

    expect(convertNotesToTree(notes)).toEqual(expectedResult);
  });
});

/**
 * Test suite for the generateUniqueId function.
 * This function generates a unique ID given a list of existing IDs.
 */
describe('generateUniqueId', () => {
  it('returns a unique id when existingIds is empty', () => {
    const existingIds = [];
    const result = generateUniqueId(existingIds);
    expect(result).toMatch(/^[0-9a-z]{9}$/);
  });

  it('returns a unique id when existingIds includes the generated id', () => {
    const existingIds = ['abcdefgh', '12345678'];
    const result = generateUniqueId(existingIds);
    expect(result).toMatch(/^[0-9a-z]{9}$/);
    expect(existingIds).not.toContain(result);
  });

  it('returns a different id each time it is called', () => {
    const existingIds = [];
    const result1 = generateUniqueId(existingIds);
    const result2 = generateUniqueId(existingIds);
    expect(result1).not.toEqual(result2);
  });
});

/**
 * Test suite for the removeIdsFromTree function.
 * This function removes ids from a given tree.
 */
describe('removeIdsFromTree', () => {
  test('removes ids from tree', () => {
    const tree = [
      {
        id: 1,
        parent_id: null,
        user_id: 100,
        project_id: 200,
        data: {
          blocks: [
            { id: 10, content: 'Block 1' },
            { id: 11, content: 'Block 2' },
          ],
        },
        children: [
          {
            id: 2,
            parent_id: 1,
            user_id: 101,
            project_id: 201,
            data: {
              blocks: [{ id: 20, content: 'Block 3' }],
            },
            children: [],
          },
        ],
      },
    ];

    const expectedTree = [
      {
        data: {
          blocks: [{ content: 'Block 1' }, { content: 'Block 2' }],
        },
        children: [
          {
            data: {
              blocks: [{ content: 'Block 3' }],
            },
            children: [],
          },
        ],
      },
    ];
    expect(removeIdsFromTree(tree)).toEqual(expectedTree);
  });

  test('returns an empty array if tree is undefined', () => {
    expect(removeIdsFromTree(undefined)).toEqual([]);
  });
});

/**
 * buildTree is a function that takes an array of flat items and returns a tree structure.
 * Each item in the input array should have an 'id' property, a 'parent_id' property, and a 'title' property.
 * If an item has a 'parent_id' property that refers to the 'id' of another item in the input array,
 * then it is considered a child of that item.
 */
describe('buildTree', () => {
  it('should build a tree from flat items', () => {
    const items = [
      { id: 1, parent_id: null, title: 'test1' },
      { id: 2, parent_id: 1, title: 'test2' },
      { id: 3, parent_id: 1, title: 'test3' },
      { id: 4, parent_id: 3, title: 'test4' },
    ];

    const expectedTree = [
      {
        id: 1,
        parent_id: null,
        title: 'test1',
        children: [
          { id: 2, parent_id: 1, title: 'test2', children: [] },
          {
            id: 3,
            parent_id: 1,
            title: 'test3',
            children: [{ id: 4, parent_id: 3, title: 'test4', children: [] }],
          },
        ],
      },
    ];

    expect(buildTree(items)).toEqual(expectedTree);
  });

  it('should return an empty array if items is undefined', () => {
    expect(buildTree(undefined)).toEqual([]);
  });

  it('should return an empty array if items is an empty array', () => {
    expect(buildTree([])).toEqual([]);
  });
});
