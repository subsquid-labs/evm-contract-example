import {lookupArchive} from '@subsquid/archive-registry'
import {
    BlockHeader,
    DataHandlerContext,
    EvmBatchProcessor,
    EvmBatchProcessorFields,
    Log as _Log,
    Transaction as _Transaction,
} from '@subsquid/evm-processor'
import {Store} from '@subsquid/typeorm-store'
import * as erc721 from './abi/erc721'

export const CONTRACT_ADDRESS = '0xac5c7493036de60e63eb81c5e9a440b42f47ebf5'

export const processor = new EvmBatchProcessor()
    .setDataSource({
        archive: lookupArchive('eth-mainnet'),
        chain: 'https://rpc.ankr.com/eth',
    })
    .setFinalityConfirmation(10)
    .setBlockRange({
        from: 15_584_000,
    })
    .setFields({
        evmLog: {
            topics: true,
            data: true,
        },
        transaction: {
            hash: true,
        },
    })
    .addLog({
        address: [CONTRACT_ADDRESS],
        topic0: [erc721.events.Transfer.topic],
        transaction: true,
    })

export type Fields = EvmBatchProcessorFields<typeof processor>
export type Context = DataHandlerContext<Store, Fields>
export type Block = BlockHeader<Fields>
export type Log = _Log<Fields>
export type Transaction = _Transaction<Fields>
