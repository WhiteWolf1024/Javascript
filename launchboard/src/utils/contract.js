export async function getAccountStakes(account, launchPoolTracker, launchPoolId) {
    const queryFilter = launchPoolTracker.filters.Staked(launchPoolId, account, null, null, null);
    const accountStakes = await launchPoolTracker.queryFilter(queryFilter);

    const queryFilter1 = launchPoolTracker.filters.Unstaked(launchPoolId, null, null, null, null);
    const accountUnStakes = await launchPoolTracker.queryFilter(queryFilter1);

    var unStakeIds = [];
    accountUnStakes.map(stake => {
        unStakeIds.push(stake.args[4].toString())
    })

    const stakeList = [];

    accountStakes.map(stake => {
        if(!unStakeIds.includes(stake.args[4].toString()))  stakeList.push({
            poolId: stake.args[0].toString(),
            account: stake.args[1],
            token: stake.args[2],
            amount: stake.args[3].toString(),
            stakeId: stake.args[4].toString()
        })
    });

    console.log("stakeList")
    console.log(stakeList)

    return stakeList;
}

export async function getAllStakes(launchPoolTracker, launchPoolId) {
    const queryFilter = launchPoolTracker.filters.Staked(launchPoolId, null, null, null, null);
    const accountStakes = await launchPoolTracker.queryFilter(queryFilter);

    const queryFilter1 = launchPoolTracker.filters.Unstaked(launchPoolId, null, null, null, null);
    const accountUnStakes = await launchPoolTracker.queryFilter(queryFilter1);

    var unStakeIds = [];
    accountUnStakes.map(stake => {
        unStakeIds.push(stake.args[4].toString())
    })

    const stakeList = [];

    accountStakes.map(stake => {
        if(!unStakeIds.includes(stake.args[4].toString()))  stakeList.push( {
            poolId: stake.args[0].toString(),
            account: stake.args[1],
            token: stake.args[2],
            amount: stake.args[3].toString(),
            stakeId: stake.args[4].toString()
        })
    });

    return stakeList;
}