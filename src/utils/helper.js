/**
 * Recursively converts an array of notes into a tree structure.
 *
 * @param {Array} notes - The array of notes to convert.
 * @param {string|null} parentId - The ID of the parent node. Default is null.
 * @return {Array} The tree structure of the notes, or [] if there are no filtered notes.
 */
export const convertNotesToTree = (notes = [], parentId = null) => {
  if (!Array.isArray(notes)) {
    return [];
  }
  const filteredNotes = notes.filter((note) => note.parent_id === parentId);
  if (filteredNotes?.length === 0) {
    return [];
  }
  filteredNotes.sort((a, b) => a?.sorting - b?.sorting);
  const newNotes = filteredNotes.map((note) => ({
    id: note?.id,
    name: note?.title,
    ...(note?.is_folder && {
      children: convertNotesToTree(notes, note.id),
    }),
  }));
  return newNotes;
};

/**
 * Generates a unique ID by appending a random 9-character string to '000000000'
 * and slicing the result to have length 9. The generated ID is guaranteed to be
 * unique based on the provided array of existing IDs.
 *
 * @param {Array} existingIds - An array of existing IDs.
 * @return {string} The generated unique ID.
 */
export const generateUniqueId = (existingIds) => {
  let newId;
  do {
    newId = ('000000000' + Math.random().toString(36).substring(2, 9)).slice(-9);
  } while (existingIds.includes(newId));
  return newId;
};

/**
 * Removes specific IDs from the given item and its children recursively.
 *
 * @param {object} item - The item from which to remove IDs.
 * @return {void}
 */
const removeIdsFromItem = (item) => {
  delete item.id;
  delete item.parent_id;
  delete item?.user_id;
  delete item?.project_id;

  item?.data?.blocks?.forEach((block) => delete block.id);
  item?.children.forEach(removeIdsFromItem);
};

/**
 * Removes ids from a tree structure.
 *
 * @param {Array} tree - the tree structure to remove ids from
 * @return {Array} the tree structure with ids removed
 */
export const removeIdsFromTree = (tree) => {
  if (!tree) {
    return [];
  }
  tree.forEach(removeIdsFromItem);
  return tree;
};

/**
 * Converts a JSON formation into a tree structure and removes the IDs from the tree.
 *
 * @param {Object} data - The JSON formation data to be converted into a tree.
 * @return {Object} The transformed tree data with IDs removed.
 */
export function formationJSONToTree(data) {
  const treeData = buildTree(data);
  const transformedData = removeIdsFromTree(treeData);
  return transformedData;
}

/**
 * Builds a tree data structure from the given array of items.
 *
 * @param {Array} items - The array of items to build the tree from.
 * @returns {Array} The tree data structure.
 */
export const buildTree = (items) => {
  if (!items) {
    return [];
  }

  const tree = [];
  const itemMap = {};

  items.forEach((item) => {
    item.children = [];
    itemMap[item.id] = item;
  });

  items.forEach((item) => {
    if (item?.parent_id) {
      const parentItem = itemMap[item.parent_id];
      if (parentItem) {
        parentItem.children.push(item);
      }
    } else {
      tree.push(item);
    }
  });

  return tree;
};

/**
 * Parses an array of notes and generates a new array with an additional top-level folder.
 *
 * @param {Array} notes - The array of notes to be parsed.
 * @param {string} user_id - The ID of the user.
 * @param {string} deleted_at - The deletion timestamp.
 * @param {Array} [allNotes=[]] - The array of all notes (optional).
 * @return {Array} - The parsed notes array with an additional top-level folder.
 */

export const parseNotesWithTopFolder = (notes, user_id, deleted_at, allNotes = []) => {
  const exportFolderId = generateUniqueId(allNotes);
  const exportFolderDateTime = new Date().toISOString().replace(/[:.]/g, '-');
  const exportFolder = {
    id: exportFolderId,
    user_id,
    title: `export-${exportFolderDateTime}`,
    data: null,
    created_at: new Date().toISOString(),
    changed_at: new Date().toISOString(),
    deleted_at,
    is_folder: true,
    parent_id: null,
    sorting: 0,
  };

  const parsedNotes = parseNotes(notes, user_id, exportFolderId);
  return [exportFolder, ...parsedNotes];
};
/**
 * Parses the notes recursively and generates unique IDs for each note.
 *
 * @param {Array} notes - The array of notes to be parsed.
 * @param {string} user_id - The ID of the user associated with the notes.
 * @param {string} parentId - The ID of the parent note. Defaults to null.
 * @param {Array} allNotes - An array containing all parsed notes.
 * @return {Array} An array of parsed notes with unique IDs and hierarchical structure.
 */
const parseNotes = (notes, user_id, parentId = null, allNotes = []) => {
  return notes.reduce((acc, note) => {
    const id = generateUniqueId(allNotes);
    const parsedNote = {
      id: id,
      user_id,
      title: note.title,
      data: parseData(note.data),
      created_at: note.created_at,
      changed_at: new Date().toISOString(),
      deleted_at: note.deleted_at,
      is_folder: note.is_folder,
      parent_id: parentId,
      sorting: note.sorting,
    };
    acc.push(parsedNote);
    if (note.children?.length > 0) {
      const childNotes = parseNotes(note.children, user_id, id);
      acc = acc.concat(childNotes);
    }
    return acc;
  }, []);
};

/**
 * Parse the given data object and extract specific fields.
 *
 * @param {Object} data - The data object to be parsed.
 * @return {Object} An object containing 'blocks', 'version', and 'time' fields.
 */
const parseData = (data) => {
  if (!data) {
    return null;
  }
  return {
    blocks: data.blocks || [],
    version: data.version,
    time: data.time,
  };
};
