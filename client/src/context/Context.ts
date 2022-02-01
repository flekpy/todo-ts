import React from 'react';

export interface TagsContextInterface {
  selectTags: any[]
  setSelectedTags: any
}

export const TagsContext = React.createContext<TagsContextInterface | null>(null);
