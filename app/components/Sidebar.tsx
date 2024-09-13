"use client";
import { useState } from "react";
import menuData from "../config/config.json";
import Options from "./Option";

export default function Sidebar() {
  const [selected, SetSelected] = useState("");

  return (
    <aside className="flex h-[500px] w-[150px] flex-col gap-1 rounded-md bg-gray-200 text-sm duration-300 dark:bg-menu">
      <Options
        label={"select-language"}
        data={menuData.menuLists.languages}
        name={"language"}
        id={"select-language"}
        defaultSelected={"language"}
      />
      <label htmlFor="select-difficulty"></label>
      <select
        className="m-1 cursor-pointer rounded-md bg-gray-200 p-1 duration-300 hover:bg-gray-400 dark:bg-menu dark:hover:bg-slate-700"
        name="difficulty"
        id="select-difficulty"
      >
        <option selected disabled className="text-start">
          difficulty
        </option>
        <option value="easy">easy</option>
        <option value="medium">medium</option>
        <option value="hard">hard</option>
        <option value="very-hard">very hard</option>
        <option value="expert">expert</option>
        <option value="randomize">Randomize</option>
      </select>
      <label htmlFor="select-type"></label>
      <select
        className="m-1 cursor-pointer rounded-md bg-gray-200 p-1 duration-300 hover:bg-gray-400 dark:bg-menu dark:hover:bg-slate-700"
        name="type"
        id="select-type"
      >
        <option selected disabled className="text-start">
          data type
        </option>
        <option value="array">array</option>
        <option value="boolean">boolean</option>
        <option value="char">char</option>
        <option value="dictionary">dictionary / map</option>
        <option value="double">double</option>
        <option value="float">float</option>
        <option value="int">int</option>
        <option value="list">list</option>
        <option value="object">object / struct</option>
        <option value="randomize">Randomize</option>
        <option value="string">string</option>
      </select>
      <label htmlFor="select-topic"></label>
      <select
        className="m-1 cursor-pointer rounded-md bg-gray-200 p-1 duration-300 hover:bg-gray-400 dark:bg-menu dark:hover:bg-slate-700"
        name="topic"
        id="select-topic"
      >
        <option selected disabled className="text-start">
          topic
        </option>
        <optgroup label="Data Structures">
          <option value="array">Array</option>
          <option value="binary-search-tree">Binary Search Tree</option>
          <option value="binary-tree">Binary Tree</option>
          <option value="doubly-linked-list">Doubly Linked List</option>
          <option value="graph">Graph</option>
          <option value="hash-table">Hash Table</option>
          <option value="heap">Heap</option>
          <option value="linked-list">Linked List</option>
          <option value="queue">Queue</option>
          <option value="stack">Stack</option>
          <option value="trie">Trie</option>
        </optgroup>
        <optgroup label="Algorithms">
          <option value="algorithm">Algorithm</option>
          <option value="back-tracking">Back Tracking</option>
          <option value="binary-search">Binary Search</option>
          <option value="breadth-first-search">Breadth-First Search</option>
          <option value="counting-sort">Counting Sort</option>
          <option value="depth-first-search">Depth-First Search</option>
          <option value="divide-and-conquer">Divide And Conquer</option>
          <option value="dynamic-programming">Dynamic Programming</option>
          <option value="memoization">Memoization</option>
          <option value="merge-sort">Merge Sort</option>
          <option value="minimum-spanning-tree">Minimum Spanning Tree</option>
          <option value="prefix-sum">Prefix Sum</option>
          <option value="quickselect">QuickSelect</option>
          <option value="searching">Searching</option>
          <option value="segment-tree">Segment Tree</option>
          <option value="shortest-path">Shortest Path</option>
          <option value="sorting">Sorting</option>
          <option value="string-matching">String Matching</option>
          <option value="suffix-array">Suffix Array</option>
          <option value="topological-sort">Topological Sort</option>
        </optgroup>
        <optgroup label="Advanced Topics">
          <option value="bellman-ford">Bellman-Ford</option>
          <option value="bit-manipulation">Bit Manipulation</option>
          <option value="bitmask">Bitmask</option>
          <option value="bucket-sort">Bucket Sort</option>
          <option value="combinatorics">Combinatorics</option>
          <option value="concurrency">Concurrency</option>
          <option value="counting">Counting</option>
          <option value="divide-and-conquer">Divide And Conquer</option>
          <option value="dynamic-programming">Dynamic Programming</option>
          <option value="enumeration">Enumeration</option>
          <option value="game-theory">Game Theory</option>
          <option value="geometry">Geometry</option>
          <option value="hash-function">Hash Function</option>
          <option value="matrix">Matrix</option>
          <option value="memoization">Memoization</option>
          <option value="merge-sort">Merge Sort</option>
          <option value="minimum-spanning-tree">Minimum Spanning Tree</option>
          <option value="monotonic-queue">Monotonic Queue</option>
          <option value="monotonic-stack">Monotonic Stack</option>
          <option value="prefix-sum">Prefix Sum</option>
          <option value="probability-and-statistics">
            Probability And Statistics
          </option>
          <option value="quickselect">QuickSelect</option>
          <option value="radix-sort">Radix Sort</option>
          <option value="rolling-hash">Rolling Hash</option>
          <option value="segment-tree">Segment Tree</option>
          <option value="sliding-window">Sliding Window</option>
          <option value="string-matching">String Matching</option>
          <option value="suffix-array">Suffix Array</option>
          <option value="topological-sort">Topological Sort</option>
          <option value="trie">Trie</option>
          <option value="two-pointers">Two Pointers</option>
          <option value="union-find">Union Find</option>
        </optgroup>
        <optgroup label="Miscellaneous">
          <option value="brainteaser">Brainteaser</option>
          <option value="data-stream">Data Stream</option>
          <option value="eulerian-circuit">Eulerian Circuit</option>
          <option value="heap(priority-queue)">Heap(Priority Queue)</option>
          <option value="interactive">Interactive</option>
          <option value="iterator">Iterator</option>
          <option value="line-sweep">Line Sweep</option>
          <option value="randomize">Randomize</option>
          <option value="rejection-sampling">Rejection Sampling</option>
          <option value="reservoir-sampling">Reservoir Sampling</option>
          <option value="shell">Shell</option>
          <option value="simulation">Simulation</option>
        </optgroup>
      </select>
      <label htmlFor="select-display-language"></label>
      <select
        className="m-1 cursor-pointer rounded-md bg-gray-200 p-1 duration-300 hover:bg-gray-400 dark:bg-menu dark:hover:bg-slate-700"
        name="display-language"
        id="select-display-language"
      >
        <option selected disabled className="text-start">
          display on
        </option>
        <option value="british english">British English</option>
        <option value="chinese">Chinese</option>
        <option value="english">English</option>
        <option value="french">French</option>
        <option value="german">German</option>
        <option value="italian">Italian</option>
        <option value="japanese">Japanese</option>
        <option value="korean">Korean</option>
        <option value="portuguese">Portuguese</option>
        <option value="russian">Russian</option>
        <option value="spanish">Spanish</option>
      </select>
      <button
        id="create"
        type="submit"
        className="m-1 rounded-[15px] bg-gray-400 p-1 text-[1rem] font-bold duration-300 hover:bg-gray-600 dark:bg-slate-700 dark:hover:bg-slate-500"
      >
        create problem
      </button>
      <div className="mt-auto flex flex-col gap-1">
        <div
          hidden
          id="speech-bubble"
          className="rounded-[15px] bg-slate-500 p-1 text-center shadow-md"
        >
          success save!
        </div>
        <label htmlFor="savedata"></label>
        <select
          className="m-1 cursor-pointer rounded-md bg-gray-200 p-1 duration-300 hover:bg-gray-400 dark:bg-menu dark:hover:bg-slate-700"
          name="data"
          id="savedata"
        ></select>
        <button
          id="load"
          type="button"
          className="m-1 rounded-[15px] bg-gray-400 p-1 text-[1rem] font-bold duration-300 hover:bg-gray-600 dark:bg-slate-700 dark:hover:bg-slate-500"
        >
          load
        </button>
        <button
          id="delete"
          type="button"
          className="m-1 rounded-[15px] bg-gray-400 p-1 text-[1rem] font-bold duration-300 hover:bg-gray-600 dark:bg-slate-700 dark:hover:bg-slate-500"
        >
          delete
        </button>
        <button
          id="delete-all"
          type="button"
          className="m-1 rounded-[15px] bg-gray-400 p-1 text-[1rem] font-bold duration-300 hover:bg-gray-600 dark:bg-slate-700 dark:hover:bg-slate-500"
        >
          delete all
        </button>
      </div>
    </aside>
  );
}
