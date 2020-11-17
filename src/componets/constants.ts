export const CATEGORY_COUNT = [1, 2, 3, 4, 5];

export type SELECTED_CATEGORIES = {
  id: string;
  title: string;
  clues_count: string;
  clues: [
    {
      airdate: string;
      answer: string;
      category_id: string;
      game_id: string;
      id: string;
      invalid_count: string;
      question: string;
      value: string;
    }
  ];
};

export type SELECTED_CLUE = {
  airdate: string;
  answer: string;
  category_id: string;
  game_id: string;
  id: string;
  invalid_count: string;
  question: string;
  value: string;
};

export const SET_CATEGORIES = [{ id: '', title: '', clues_count: '' }];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
export const MENUPROPS = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
