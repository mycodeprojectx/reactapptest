// src/database/schema.ts
import Realm from 'realm';

export const ThemeSchema = {
  name: 'Theme',
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: 'string',
    description: 'string',
    totalQuestions: 'int',
  },
};

export const AlternativeSchema = {
  name: 'Alternative',
  primaryKey: 'id',
  properties: {
    id: 'int',
    text: 'string',
  },
};

export const QuestionSchema = {
  name: 'Question',
  primaryKey: 'id',
  properties: {
    id: 'int',
    theme: 'string',
    statement: 'string',
    alternatives: 'Alternative[]',
    explanation: 'string',
    correctAlternativeId: 'int',
  },
};

export const realm = new Realm({
  schema: [ThemeSchema, AlternativeSchema, QuestionSchema],
  schemaVersion: 1,
});