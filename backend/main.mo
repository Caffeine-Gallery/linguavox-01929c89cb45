import Hash "mo:base/Hash";

import Array "mo:base/Array";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Text "mo:base/Text";

actor {
  // Define types
  type TranslationEntry = {
    original: Text;
    translated: Text;
    targetLanguage: Text;
  };

  // Create a stable variable to store translation history
  stable var translationEntries : [(Text, TranslationEntry)] = [];

  // Create a HashMap to store translation history
  var translationHistory = HashMap.HashMap<Text, TranslationEntry>(0, Text.equal, Text.hash);

  // Initialize the HashMap with stable data
  public func init() : async () {
    translationHistory := HashMap.fromIter<Text, TranslationEntry>(translationEntries.vals(), 0, Text.equal, Text.hash);
  };

  // Add a translation entry to the history
  public func addTranslation(id: Text, entry: TranslationEntry) : async () {
    translationHistory.put(id, entry);
  };

  // Get all translation entries
  public query func getTranslations() : async [TranslationEntry] {
    Iter.toArray(translationHistory.vals())
  };

  // Clear translation history
  public func clearHistory() : async () {
    translationHistory := HashMap.HashMap<Text, TranslationEntry>(0, Text.equal, Text.hash);
  };

  // Get the size of the translation history
  public query func getHistorySize() : async Nat {
    translationHistory.size()
  };

  // System functions for upgrades
  system func preupgrade() {
    translationEntries := Iter.toArray(translationHistory.entries());
  };

  system func postupgrade() {
    translationHistory := HashMap.fromIter<Text, TranslationEntry>(translationEntries.vals(), 0, Text.equal, Text.hash);
  };
}
