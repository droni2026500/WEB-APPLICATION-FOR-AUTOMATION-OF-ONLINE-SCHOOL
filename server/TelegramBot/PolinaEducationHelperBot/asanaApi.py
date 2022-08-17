import os
import asana
import json
# replace with your personal access token.

# Check and set our environment variables
personal_access_token = "1/1201721531261001:a0344891455630f93a031df03ac17b0c"

client = asana.Client.access_token(personal_access_token)

me = client.users.me()
print(me)
print("Hello world! " + "My name is " + me['name'] + ".")


result = client.tasks.create_in_workspace('1200921397755202',
                                          {'name': 'Баг',
                                           'notes': 'Note: This is a test task created with the python-asana client.',
                                           'projects': '1202291931632630'})

print(json.dumps(result, indent=4))

for workspace in client.workspaces.find_all():
    print(workspace)
