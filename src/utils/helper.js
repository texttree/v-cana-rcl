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

export const generateUniqueId = (existingIds) => {
  let newId;
  do {
    newId = ('000000000' + Math.random().toString(36).substring(2, 9)).slice(-9);
  } while (existingIds.includes(newId));
  return newId;
};

export const exportNotes = (notes) => {
  try {
    if (!notes || !notes.length) {
      throw new Error('No data');
    }
    const transformedData = formationJSONToTree(notes);
    const jsonContent = JSON.stringify(
      { type: 'personal_notes', data: transformedData },
      null,
      2
    );

    const blob = new Blob([jsonContent], { type: 'application/json' });

    const downloadLink = document.createElement('a');
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];

    const fileName = `personal_notes_${formattedDate}.json`;

    const url = URL.createObjectURL(blob);

    downloadLink.href = url;
    downloadLink.download = fileName;

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    URL.revokeObjectURL(url);
  } catch (error) {
    return error;
  }
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
 * Imports notes from a JSON file and adds them to the user's personal notes.
 *
 * @param {Object} user - The user object containing the user's ID and deletion status.
 * @param {Function} bulkNode - The function to add notes in bulk.
 * @param {Array} notes - The array of existing notes.
 * @return {Promise<Error|undefined>} - Returns an error if there was an issue with importing the notes, otherwise undefined.
 */
export const importNotes = async (user, bulkNode, notes) => {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = '.json';
  fileInput.addEventListener('change', async (event) => {
    try {
      const file = event.target.files[0];
      if (!file) {
        throw new Error('No File Selected');
      }

      const fileContents = await file.text();
      if (!fileContents.trim()) {
        throw new Error('Empty file content');
      }

      const importedData = JSON.parse(fileContents);
      if (importedData.type !== 'personal_notes') {
        throw new Error('Content error');
      }
      const parsedNotes = parseNotesWithTopFolder(
        importedData.data,
        user.id,
        user.deleted_at,
        notes.map((note) => note.id)
      );

      for (const note of parsedNotes) {
        bulkNode(note);
      }
    } catch (error) {
      return error;
    }
  });

  fileInput.click();
};

const parseNotesWithTopFolder = (notes, user_id, deleted_at, allNotes = []) => {
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
  const parsedNotes = parseNotes(notes, user_id, exportFolderId);
  return [exportFolder, ...parsedNotes];
};

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
