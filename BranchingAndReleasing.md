# How to manage Branches and Releases
How to manage a repository. ( Self-helping document ( Not a git guru =) ) )

## Todays status

- When a new Release request(TAG) is published, it will start 2 workflows.
    - one builds 3 executables and uploads it to the release.
    -  the other builds a linux docker container and uploads it to docker hub.
        - it will upload ":latest" and the ":version" tag. (Manually set tag for now.)


## Todo

- When the main features and bugs are fixed, start using branches with name: release-XXX.
    - which gets merged to master.
    - for feature and bugs, create branches, which gets merged  to release-XXX.


Just an start for learning git management... =)