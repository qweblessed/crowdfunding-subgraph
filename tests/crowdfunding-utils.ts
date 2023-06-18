import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  Funded,
  OwnershipTransferred,
  ProjectCreated,
  RaisedFundsReceived,
  ReFunded,
  Withdraw
} from "../generated/Crowdfunding/Crowdfunding"

export function createFundedEvent(
  projectId: BigInt,
  amount: BigInt,
  investor: Address
): Funded {
  let fundedEvent = changetype<Funded>(newMockEvent())

  fundedEvent.parameters = new Array()

  fundedEvent.parameters.push(
    new ethereum.EventParam(
      "projectId",
      ethereum.Value.fromUnsignedBigInt(projectId)
    )
  )
  fundedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  fundedEvent.parameters.push(
    new ethereum.EventParam("investor", ethereum.Value.fromAddress(investor))
  )

  return fundedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createProjectCreatedEvent(
  param0: ethereum.Tuple
): ProjectCreated {
  let projectCreatedEvent = changetype<ProjectCreated>(newMockEvent())

  projectCreatedEvent.parameters = new Array()

  projectCreatedEvent.parameters.push(
    new ethereum.EventParam("param0", ethereum.Value.fromTuple(param0))
  )

  return projectCreatedEvent
}

export function createRaisedFundsReceivedEvent(
  projectId: BigInt,
  amount: BigInt,
  founder: Address
): RaisedFundsReceived {
  let raisedFundsReceivedEvent = changetype<RaisedFundsReceived>(newMockEvent())

  raisedFundsReceivedEvent.parameters = new Array()

  raisedFundsReceivedEvent.parameters.push(
    new ethereum.EventParam(
      "projectId",
      ethereum.Value.fromUnsignedBigInt(projectId)
    )
  )
  raisedFundsReceivedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  raisedFundsReceivedEvent.parameters.push(
    new ethereum.EventParam("founder", ethereum.Value.fromAddress(founder))
  )

  return raisedFundsReceivedEvent
}

export function createReFundedEvent(
  projectId: BigInt,
  amount: BigInt,
  investor: Address
): ReFunded {
  let reFundedEvent = changetype<ReFunded>(newMockEvent())

  reFundedEvent.parameters = new Array()

  reFundedEvent.parameters.push(
    new ethereum.EventParam(
      "projectId",
      ethereum.Value.fromUnsignedBigInt(projectId)
    )
  )
  reFundedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  reFundedEvent.parameters.push(
    new ethereum.EventParam("investor", ethereum.Value.fromAddress(investor))
  )

  return reFundedEvent
}

export function createWithdrawEvent(amount: BigInt): Withdraw {
  let withdrawEvent = changetype<Withdraw>(newMockEvent())

  withdrawEvent.parameters = new Array()

  withdrawEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return withdrawEvent
}
