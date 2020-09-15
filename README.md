# codewars-2-kyu-break-the-pieces
Break the pieces

https://habr.com/ru/post/125356/

http://algolist.manual.ru/maths/geom/polygon/area.php

https://habr.com/ru/post/111361/

Horton algorithm - Find the minimum cycle basis (MCB)
Input: Biconnected graph G = (V, E)
Output: Minimum Cycle Basis B
  1.  Find the shortest path P (x, y) between each pair of
      vertices x, y ∈ V. Use Dijkstra's algorithm.
  2.  for v ∈ V do
        for (x, y) ∈ E do
          Create the cycle C(v, x, y) = P (v, x) ∪ P (v, y) ∪ (x, y)
          and calculate its length. De-generate cases in which P (v, x)
          and P (v, y) have vertices other than v in common can be omitted.
        end
      end
  3.  Order the cycles by increasing lengths.
  4.  Initialize B = ∅. Add to B the next shortest cycle if it is independent
      from the already selected ones.
