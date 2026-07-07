// Huffman Coding - Greedy Algorithm
export const HuffmanCoding = {
  name: 'Huffman Coding',
  description: 'Huffman Coding is a greedy algorithm that produces an optimal prefix-free code for a given set of frequencies. It is widely used in data compression, reducing file sizes by encoding more frequent characters with fewer bits.',
  complexity: {
    time: 'O(n log n)',
    space: 'O(n)'
  },
  pseudocode: `procedure huffmanCoding(frequencies)
    queue := createMinHeap(frequencies)
    while length(queue) > 1 do
        node1 := extractMin(queue)
        node2 := extractMin(queue)
        parent := createNode(node1.freq + node2.freq)
        parent.left := node1
        parent.right := node2
        insert(queue, parent)
    end while
    return queue[0]
end procedure`,
  useCases: [
    'Data compression (ZIP, JPEG)',
    'Text file encoding',
    'Audio/video compression',
    'Network data transmission'
  ],
  initialize: (size) => {
    return {
      chars: ['A', 'B', 'C', 'D', 'E'],
      frequencies: [45, 13, 12, 16, 14],
      steps: [],
      currentArray: []
    }
  },
  render: (ctx, state, currentStep, width, height) => {
    ctx.fillStyle = '#000'
    ctx.font = '16px Arial'
    ctx.fillText('Huffman Coding Tree', 10, 30)
  }
}
