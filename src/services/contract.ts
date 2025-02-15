import { Address } from "viem";
import { Interface, InterfaceAbi } from "ethers";

export const taskContract = {
  contractAddr: "0xf27D296a69f5836c749F77F6e379a6C6dE9793c2" as Address,
  contractABI: [
    {
      inputs: [
        {
          internalType: "string",
          name: "content",
          type: "string",
        },
        {
          internalType: "string",
          name: "createdAt",
          type: "string",
        },
      ],
      name: "createTask",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "deleteAllTasks",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "taskId",
          type: "uint256",
        },
      ],
      name: "deleteTaskById",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "user",
          type: "address",
        },
      ],
      name: "TaskCleared",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "user",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "taskId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "string",
          name: "content",
          type: "string",
        },
        {
          indexed: false,
          internalType: "string",
          name: "createdAt",
          type: "string",
        },
      ],
      name: "TaskCreatedEvent",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "user",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "taskId",
          type: "uint256",
        },
      ],
      name: "TaskDeletedEvent",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "user",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "taskId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "bool",
          name: "isCompleted",
          type: "bool",
        },
      ],
      name: "TaskStatusUpdatedEvent",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "taskId",
          type: "uint256",
        },
      ],
      name: "updateStatusById",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "getAllTasks",
      outputs: [
        {
          components: [
            {
              internalType: "uint256",
              name: "id",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "content",
              type: "string",
            },
            {
              internalType: "string",
              name: "createdAt",
              type: "string",
            },
            {
              internalType: "bool",
              name: "isCompleted",
              type: "bool",
            },
          ],
          internalType: "struct TudooLisk.TaskStruct[]",
          name: "userTasks",
          type: "tuple[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ] as Interface | InterfaceAbi,
};
