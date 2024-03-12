import { ELEMENT_BLOCKQUOTE } from '@udecode/plate-block-quote';
import { ELEMENT_CODE_BLOCK } from '@udecode/plate-code-block';
import { TComboboxItem } from '@udecode/plate-combobox';
import { ELEMENT_H1, ELEMENT_H2, ELEMENT_H3 } from '@udecode/plate-heading';
import { ListStyleType } from '@udecode/plate-indent-list';
import { ELEMENT_TODO_LI } from '@udecode/plate-list';
import { ELEMENT_IMAGE } from '@udecode/plate-media';
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';
import { ELEMENT_TABLE } from '@udecode/plate-table';
import {
  CheckSquare,
  Code,
  Heading1,
  Heading2,
  Heading3,
  ImageIcon,
  List,
  ListOrdered,
  Text,
  TextQuote,
} from 'lucide-react';

export type TSlashData = {
  title: string;
  description: string;
  searchTerms?: string[];
  icon: JSX.Element;
  value: string;
};

export const SLASH_ITEMS: TComboboxItem<TSlashData>[] = [
  {
    data: {
      title: 'Text',
      description: 'Just start typing with plain text.',
      searchTerms: ['p', 'paragraph'],
      icon: <Text size={18} />,
      value: ELEMENT_PARAGRAPH,
    },
    key: 'text',
    text: 'Text',
  },
  {
    data: {
      title: 'To-do List',
      description: 'Track tasks with a to-do list.',
      searchTerms: ['todo', 'task', 'list', 'check', 'checkbox'],
      icon: <CheckSquare size={18} />,
      value: ELEMENT_TODO_LI,
    },
    key: 'To-do List',
    text: 'To-do List',
  },
  {
    data: {
      title: 'Heading 1',
      description: 'Big section heading.',
      searchTerms: ['title', 'big', 'large'],
      icon: <Heading1 size={18} />,
      value: ELEMENT_H1,
    },
    key: 'Heading 1',
    text: 'Heading 1',
  },
  {
    data: {
      title: 'Heading 2',
      description: 'Medium section heading.',
      searchTerms: ['subtitle', 'medium'],
      icon: <Heading2 size={18} />,
      value: ELEMENT_H2,
    },
    key: 'Heading 2',
    text: 'Heading 2',
  },
  {
    data: {
      title: 'Heading 3',
      description: 'Small section heading.',
      searchTerms: ['subtitle', 'small'],
      icon: <Heading3 size={18} />,
      value: ELEMENT_H3,
    },
    key: 'Heading 3',
    text: 'Heading 3',
  },
  {
    data: {
      title: 'Bullet List',
      description: 'Create a simple bullet list.',
      searchTerms: ['unordered', 'point'],
      icon: <List size={18} />,
      value: ListStyleType.Disc,
    },
    key: 'Bullet List',
    text: 'Bullet List',
  },
  {
    data: {
      title: 'Numbered List',
      description: 'Create a list with numbering.',
      searchTerms: ['ordered'],
      icon: <ListOrdered size={18} />,
      value: ListStyleType.Decimal,
    },
    key: 'Numbered List',
    text: 'Numbered List',
  },
  {
    data: {
      title: 'Quote',
      description: 'Capture a quote.',
      searchTerms: ['blockquote'],
      icon: <TextQuote size={18} />,
      value: ELEMENT_BLOCKQUOTE,
    },
    key: 'Quote',
    text: 'Quote',
  },
  {
    data: {
      title: 'Code',
      description: 'Capture a code snippet.',
      searchTerms: ['codeblock'],
      icon: <Code size={18} />,
      value: ELEMENT_CODE_BLOCK,
    },
    key: 'Code',
    text: 'Code',
  },
  {
    data: {
      title: 'Image',
      description: 'Upload an image from your computer.',
      searchTerms: ['photo', 'picture', 'media'],
      icon: <ImageIcon size={18} />,
      value: ELEMENT_IMAGE,
    },
    key: 'Image',
    text: 'Image',
  },
  {
    data: {
      title: 'Table',
      description: 'Insert a table.',
      searchTerms: ['photo', 'picture', 'media'],
      icon: <ImageIcon size={18} />,
      value: ELEMENT_TABLE,
    },
    key: 'Table',
    text: 'Table',
  },
  // {
  //   data: {
  //     title: 'Emoji',
  //     description: 'Pick an emoji.',
  //     searchTerms: ['photo', 'picture', 'media'],
  //     icon: <ImageIcon size={18} />,
  //     value: 'emoji',
  //   },
  //   key: 'Emoji',
  //   text: 'Emoji',
  // },
];
