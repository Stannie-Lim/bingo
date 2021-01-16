const RandomizedSet = function () {
  this.players = [];
  this.indices = {};

  for (let i = 0; i < 100; i++) {
    this.insert(i);
  }
};

/**
 * Inserts a value to the set. Returns true if the set did not already contain the specified element.
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.insert = function (email) {
  // if email is not in the lottery, return false  O(1)
  if (email in this.indices) {
    return false;
  }

  // if you reach here, email is definitely in lottery

  // push the email into this.players O(1)
  // [ 0, 1, 2, 3, 4, 5, 6 ]
  this.players.push(email);

  // how do we get the index of where the email is, in this.players? -> this.players.length - 1 O(1)
  // indexOfPlayer
  const indexOfPlayer = this.players.length - 1;

  // put the email into the hash table. the key will be the email and value will be the index O(1)
  this.indices[email] = indexOfPlayer;

  return true;
};

/**
 * Removes a value from the set. Returns true if the set contained the specified element.
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.remove = function (email) {
  // check if email is in this.indices first.
  // if it's not in this.indices, return false instantly
  // O(1)
  if (!(email in this.indices)) return false;

  // if you reach here, it is definitely in this.indices

  // 1) get the corresponding index of the email (from the hash table)
  // this.indices[email] -> this variable will be named "indexOfDeletion"
  // O(1)
  const indexOfDeletion = this.indices[email];

  // 2) swap(array[last index], array[indexOfDeletion])
  // [ 0, 1, 2, 3, 4 ] -> want to delete 2
  //         ^     ^
  // [ 0, 1, 4, 3, 2 ] -> swapped
  // O(1)
  this._swap(this.players, this.players.length - 1, indexOfDeletion);

  // 3) pop from the end
  // [ 0, 1, 4, 3 ] -> popped
  // O(1)
  this.players.pop();

  // 4) reorder the indices in this.indices
  // this.indices[lastEmail] = indexOfDeletion;
  // O(1)
  const previousLastEmail = this.players[indexOfDeletion];
  this.indices[previousLastEmail] = indexOfDeletion;

  // 5) delete this.indices[email];
  // O(1)
  delete this.indices[email];

  return true;
};

/**
 * Get a random element from the set.
 * @return {number}
 */
RandomizedSet.prototype.getRandom = function () {
  // O(1)
  const randomIndex = Math.floor(Math.random() * this.players.length);
  return this.players[randomIndex];
};

RandomizedSet.prototype._swap = function (array, i, j) {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
};

module.exports = RandomizedSet;
