module lobster_addr::lobster_token {
    use std::signer;

    // Error codes
    const E_TOKEN_NOT_FOUND: u64 = 1;
    const E_UNAUTHORIZED: u64 = 3;
    const E_INVALID_PRICE: u64 = 4;

    // Predefined lobster species
    const SPECIES_MAINE: u8 = 1;
    const SPECIES_CARIBBEAN: u8 = 2;
    const SPECIES_ROCK: u8 = 3;

    // Location constants
    const LOCATION_MAINE_COAST: u8 = 1;
    const LOCATION_CARIBBEAN_SEA: u8 = 2;
    const LOCATION_PACIFIC_COAST: u8 = 3;

    // Core data structures for lobster tokenization
    struct LobsterHarvest has store, copy {
        species: u8,           
        quantity: u64,
        location: u8,          
        harvest_date: u64,
        price_per_kg: u64,
        total_value: u64,
    }

    struct LobsterToken has key {
        id: u64,              
        harvest: LobsterHarvest,
        producer: address,
    }

    struct TokenRegistry has key {
        next_token_id: u64, 
    }

    // 2. Initialize the registry for a user
    public entry fun initialize_registry(account: &signer) {
        let registry = TokenRegistry {
            next_token_id: 1,
        };
        move_to(account, registry);
    }

    // 3. Create a new lobster token
    public entry fun create_lobster_token(
        producer: &signer,
        species: u8,           
        quantity: u64,
        location: u8,          
        harvest_date: u64,
        price_per_kg: u64,
    ) acquires TokenRegistry {
        let producer_addr = signer::address_of(producer);
    
        // Ensure registry exists
        if (!exists<TokenRegistry>(producer_addr)) {
            initialize_registry(producer);
        };

        let registry = borrow_global_mut<TokenRegistry>(producer_addr);
        let token_id = registry.next_token_id;
        
        let total_value = quantity * price_per_kg;
        
        let harvest = LobsterHarvest {
            species,
            quantity,
            location,
            harvest_date,
            price_per_kg,
            total_value,
        };

        let token = LobsterToken {
            id: token_id,
            harvest,
            producer: producer_addr,
        };

        // Store token
        move_to(producer, token);

        // Update registry
        registry.next_token_id = registry.next_token_id + 1;
    }

    // 4. View functions
    #[view]
    public fun get_token_info(producer_addr: address): (u64, u8, u64, u64, u64) acquires LobsterToken {
        let token = borrow_global<LobsterToken>(producer_addr);
        (
            token.id,
            token.harvest.species,
            token.harvest.quantity,
            token.harvest.price_per_kg,
            token.harvest.total_value
        )
    }

    #[view]
    public fun get_harvest_details(producer_addr: address): (u8, u64, u8, u64) acquires LobsterToken {
        let token = borrow_global<LobsterToken>(producer_addr);
        (
            token.harvest.species,
            token.harvest.quantity,
            token.harvest.location,
            token.harvest.harvest_date
        )
    }
}