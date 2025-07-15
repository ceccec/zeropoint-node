# Proof of Navigability and Addressability

## Statement
Every node in the folder tree is uniquely addressable by a finite path array (sequence of digits from the digit array D = [0,1,2,3,4,5,6,7,8,9]).

## Mathematical Context
- The folder tree is a rooted, infinite, 10-ary tree.
- Each node is identified by a finite sequence (path array) P = [d₁, d₂, ..., dₙ], where dᵢ ∈ D.
- The set of all possible nodes is the set of all finite sequences over D.

## Proof
1. **Unique Addressing:**
   - The root node is addressed by the empty sequence [].
   - Each child of a node at path P is addressed by P + [d], where d ∈ D.
   - By induction, any node at depth n is addressed by a unique sequence of n digits.

2. **Injectivity (One-to-One):**
   - No two different sequences correspond to the same node.
   - If P ≠ Q, then the nodes at P and Q are distinct.

3. **Surjectivity (Onto):**
   - Every node in the tree is reachable by some finite sequence of digits from D.
   - For any node, its path from the root is a finite sequence of choices, each in D.

4. **Navigability:**
   - Given any path array, one can traverse the tree from the root, following the sequence of digits, to reach the unique node addressed by that path.
   - The process is algorithmic and deterministic.

## Conclusion
Every node in the folder tree is uniquely addressable and navigable by a finite path array. The mapping from path arrays to nodes is bijective, ensuring complete and unambiguous addressability throughout the structure. 