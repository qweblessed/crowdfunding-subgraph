import {
  Funded as FundedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  ProjectCreated as ProjectCreatedEvent,
  RaisedFundsReceived as RaisedFundsReceivedEvent,
  ReFunded as ReFundedEvent,
  Withdraw as WithdrawEvent,
} from "../generated/Crowdfunding/Crowdfunding";
import {
  Funded,
  Project,
  RaisedFundsReceived,
  ReFunded,
  Withdraw,
} from "../generated/schema";

export function handleFunded(event: FundedEvent): void {
  const fundInEntity = new Funded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );

  fundInEntity.projectId = event.params.projectId;
  fundInEntity.amount = event.params.amount;
  fundInEntity.investor = event.params.investor;
  fundInEntity.blockNumber = event.block.number;
  fundInEntity.blockTimestamp = event.block.timestamp;
  fundInEntity.transactionHash = event.transaction.hash;
  fundInEntity.save();

  const projectEntity = Project.load(event.params.projectId.toString());

  if (!projectEntity)
    throw new Error(
      `Project entity with id ${event.params.projectId.toString()} does not exist`
    );
  
  projectEntity.raisedAmount = projectEntity.raisedAmount.plus(event.params.amount);

  if(projectEntity.raisedAmount > projectEntity.goal){
    projectEntity.isRaised = true;
  }

  projectEntity.save();
}

export function handleProjectCreated(event: ProjectCreatedEvent): void {
  const projectEntity = new Project(event.params.param0.id.toString());

  projectEntity.name = event.params.param0.name;
  projectEntity.description = event.params.param0.description;
  projectEntity.url = event.params.param0.url;
  projectEntity.goal = event.params.param0.goal;
  projectEntity.raisedAmount = event.params.param0.raisedAmount;
  projectEntity.endDateTs = event.params.param0.endDateTs;
  projectEntity.founder = event.params.param0.founder;
  projectEntity.isWithdrawn = event.params.param0.isWithdrawn;
  projectEntity.blockTimestamp = event.block.timestamp;
  projectEntity.isRaised = false;

  projectEntity.save();
}

export function handleRaisedFundsReceived(
  event: RaisedFundsReceivedEvent
): void {
  const projectWithdrawEntity = new RaisedFundsReceived(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  projectWithdrawEntity.projectId = event.params.projectId;
  projectWithdrawEntity.amount = event.params.amount;
  projectWithdrawEntity.founder = event.params.founder;

  projectWithdrawEntity.blockNumber = event.block.number;
  projectWithdrawEntity.blockTimestamp = event.block.timestamp;
  projectWithdrawEntity.transactionHash = event.transaction.hash;
  projectWithdrawEntity.save();

  const project = Project.load(event.params.projectId.toString());

  if (!project)
    throw new Error(
      `Project entity with id ${event.params.projectId.toString()} does not exist`
    );

  project.isWithdrawn = true;
  project.save();
}

export function handleReFunded(event: ReFundedEvent): void {
  const refundEntity = new ReFunded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  refundEntity.projectId = event.params.projectId;
  refundEntity.amount = event.params.amount;
  refundEntity.investor = event.params.investor;

  refundEntity.blockNumber = event.block.number;
  refundEntity.blockTimestamp = event.block.timestamp;
  refundEntity.transactionHash = event.transaction.hash;

  refundEntity.save();
}

export function handleWithdraw(event: WithdrawEvent): void {
  const contractFeeWithdraw = new Withdraw(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  contractFeeWithdraw.amount = event.params.amount;

  contractFeeWithdraw.blockNumber = event.block.number;
  contractFeeWithdraw.blockTimestamp = event.block.timestamp;
  contractFeeWithdraw.transactionHash = event.transaction.hash;

  contractFeeWithdraw.save();
}
