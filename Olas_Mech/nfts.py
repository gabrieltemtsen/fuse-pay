from mech_client.interact import interact, ConfirmationType
   
prompt_text="Create a sophisticated and celebratory digital artwork for an NFT that represents the 'Employee of the Month' at a modern fintech company named FusePay. The image should symbolize success, innovation, and dedication. Incorporate elements that reflect financial technology, such as digital grids, abstract financial charts, and elements of digital currency. The central motif should be a trophy or a medal with subtle hints of blockchain and fintech aesthetics. The background should be sleek and modern with a touch of elegant technology themes, using a palette of blue, silver, and white. Include inspirational elements like a rising graph or digital beams to signify growth and a 2 percent salary hike reward. The style should be futuristic yet accessible, appealing to a professional audience."
agent_id = 2
tool_name = "stabilityai-stable-diffusion-v1-5"
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