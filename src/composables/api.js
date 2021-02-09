export async function getCollectionData(system, { table }) {
  const items = await getItem(system.api, { table });

  return {
    collections: system.useCollectionsStore().getCollection(table),
    fields: system.useFieldsStore().getFieldsForCollection(table),
    items: items,
  };
}

export function getVisibleCollections(system) {
  return system.useCollectionsStore().visibleCollections.value;
}

export async function getItem(api, { table }) {
  const endpoint = `/items/${table}`;
  console.log("contacting ", endpoint);


  try {
    const response = await api.get(endpoint);
    const result = await response.data;
    return result;
  } catch (err) {
    console.error(err);
  }
}
