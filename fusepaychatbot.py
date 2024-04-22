from mech_client.interact import interact, ConfirmationType

from dotenv import load_dotenv
load_dotenv()  # This loads the env variables from the .env file

def get_prompt(prompt_text):
    prompt_text="Write about the company Fuse-pay which is a payroll system. A system where a company or business owner can add his employees and pay them all at once to their wallets on a monthly basis"
    agent_id = 2
    tool_name = "openai-gpt-3.5-turbo"
    chain_config = "celo"
    private_key_path="ethereum_private_key.txt"

    result = interact(
        prompt=prompt_text,
        agent_id=agent_id,
        tool=tool_name,
        chain_config=chain_config,
        confirmation_type=ConfirmationType.ON_CHAIN,
        private_key_path=private_key_path
    )
    print(result)