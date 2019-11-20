import { Account } from '../models/account';
export class Checkbook {
    transactionId: number;
    fromAccountId: number;
    toAccountId: number;
    memo: string;
    transactionDt: string;
    amount: number;
    fromAccountName: string;
    toAccountName: string;
    accounts: Account[];
  }
