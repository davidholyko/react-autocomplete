const _ = require('lodash');

const LETTER_MAP = {
  a: 0,
  b: 1,
  c: 2,
  d: 3,
  e: 4,
  f: 5,
  g: 6,
  h: 7,
  i: 8,
  j: 9,
  k: 10,
  l: 11,
  m: 12,
  n: 13,
  o: 14,
  p: 15,
  q: 16,
  r: 17,
  s: 18,
  t: 19,
  u: 20,
  v: 21,
  w: 22,
  x: 23,
  y: 24,
  z: 25,
  0: 'a',
  1: 'b',
  2: 'c',
  3: 'd',
  4: 'e',
  5: 'f',
  6: 'g',
  7: 'h',
  8: 'i',
  9: 'g',
  10: 'h',
  11: 'l',
  12: 'm',
  13: 'n',
  14: 'o',
  15: 'p',
  16: 'q',
  17: 'r',
  18: 's',
  19: 't',
  20: 'u',
  21: 'v',
  22: 'w',
  23: 'x',
  24: 'y',
  25: 'z',
};

class TrieNode {
  constructor() {
    this.children = new Array(26);
    this.isLast = false;
  }
}

class Trie {
  constructor() {
    this.words = [];
    this.root = new TrieNode();
  }

  convertCharacterToIndex(character) {
    return LETTER_MAP[character];
  }

  convertIndexToCharacter(index) {
    return LETTER_MAP[index];
  }

  addWord(word) {
    this.words.push(word);
    const letters = _.split(word, '');

    let node = this.root;

    for (const letter of letters) {
      const index = this.convertCharacterToIndex(letter);

      if (!node.children[index]) {
        node.children[index] = new TrieNode();
      }

      node = node.children[index];
    }

    node.isLast = true;
  }

  searchWord(word) {
    const letters = _.split(word, '');

    let node = this.root;
    for (const letter of letters) {
      const index = this.convertCharacterToIndex(letter);

      if (!node.children[index]) {
        return false;
      }

      node = node.children[index];
    }

    return node && node.isLast;
  }
}

function main() {
  const keys = ['the', 'a', 'there', 'anaswe', 'any', 'by', 'their'];
  const outputs = ['Present in trie', 'Not present in trie'];
  const t = new Trie();

  _.each(keys, key => {
    t.addWord(key);
  });

  console.log('the', outputs[t.searchWord('the') ? 1 : 0]);
  console.log('these', outputs[t.searchWord('these') ? 1 : 0]);
  console.log('their', outputs[t.searchWord('their') ? 1 : 0]);
  console.log('thaw', outputs[t.searchWord('thaw') ? 1 : 0]);
  console.log(t);
}

main();
