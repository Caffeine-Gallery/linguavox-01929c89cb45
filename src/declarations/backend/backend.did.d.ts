import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface TranslationEntry {
  'translated' : string,
  'targetLanguage' : string,
  'original' : string,
}
export interface _SERVICE {
  'addTranslation' : ActorMethod<[string, TranslationEntry], undefined>,
  'clearHistory' : ActorMethod<[], undefined>,
  'getHistorySize' : ActorMethod<[], bigint>,
  'getTranslations' : ActorMethod<[], Array<TranslationEntry>>,
  'init' : ActorMethod<[], undefined>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
