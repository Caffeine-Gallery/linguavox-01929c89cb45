export const idlFactory = ({ IDL }) => {
  const TranslationEntry = IDL.Record({
    'translated' : IDL.Text,
    'targetLanguage' : IDL.Text,
    'original' : IDL.Text,
  });
  return IDL.Service({
    'addTranslation' : IDL.Func([IDL.Text, TranslationEntry], [], []),
    'clearHistory' : IDL.Func([], [], []),
    'getHistorySize' : IDL.Func([], [IDL.Nat], ['query']),
    'getTranslations' : IDL.Func([], [IDL.Vec(TranslationEntry)], ['query']),
    'init' : IDL.Func([], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
