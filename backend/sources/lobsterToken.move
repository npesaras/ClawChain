module lobster_addr::lobster_token {
    use std::signer;
    use std::vector;

    // Error codes
    const E_TOKEN_NOT_FOUND: u64 = 1;
    const E_UNAUTHORIZED: u64 = 3;
    const E_INVALID_PRICE: u64 = 4;

    // Predefined lobster species as u8 for efficiency
    const SPECIES_MAINE: u8 = 1;
    const SPECIES_CARIBBEAN: u8 = 2;
    const SPECIES_ROCK: u8 = 3;

    // 1. Simplified structs - use u8 instead of String where possible
    struct LobsterHarvest has store, copy {
        species: u8,           
        quantity: u64,
        location: u8,          
        harvest_date: u64,
        price_per_kg: u64,
        total_value: u64,
    }

    struct LobsterToken has key {
        id: u64,              // Changed from String to u64
        harvest: LobsterHarvest,
        producer: address,
    }

    struct TokenRegistry has key {
        next_token_id: u64, 
    }

    // Location constants
    const LOCATION_MAINE_COAST: u8 = 1;
    const LOCATION_CARIBBEAN_SEA: u8 = 2;
    const LOCATION_PACIFIC_COAST: u8 = 3;

    // 2. Initialize the registry for a user
    public entry fun initialize_registry(account: &signer) {
        let registry = TokenRegistry {
            next_token_id: 1,
        };
        move_to(account, registry);
    }

    // 3. Create a new lobster token - simplified
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

        // Store token - single storage operation
        move_to(producer, token);

        // Update registry - simple increment
        registry.next_token_id = registry.next_token_id + 1;
    }

    // 4. View functions - optimized
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

    // Helper functions for species names (only when needed)
    #[view]
    public fun get_species_name(species_id: u8): vector<u8> {
        if (species_id == SPECIES_MAINE) {
            b"Maine Lobster"
        } else if (species_id == SPECIES_CARIBBEAN) {
            b"Caribbean Spiny Lobster"
        } else if (species_id == SPECIES_ROCK) {
            b"Rock Lobster"
        } else {
            b"Unknown Species"
        }
    }

    #[view]
    public fun get_location_name(location_id: u8): vector<u8> {
        if (location_id == LOCATION_MAINE_COAST) {
            b"Maine Coast"
        } else if (location_id == LOCATION_CARIBBEAN_SEA) {
            b"Caribbean Sea"
        } else if (location_id == LOCATION_PACIFIC_COAST) {
            b"Pacific Coast"
        } else {
            b"Unknown Location"
        }
    }

    // Simplified test functions
    #[test(producer = @0x123)]
    public entry fun test_create_lobster_token(producer: signer) acquires TokenRegistry, LobsterToken {
        create_lobster_token(
            &producer,
            SPECIES_MAINE,        
            100,
            LOCATION_MAINE_COAST, 
            1704067200,
            25
        );

        // Verify token was created
        assert!(exists<LobsterToken>(@0x123), 1);
        assert!(exists<TokenRegistry>(@0x123), 2);
        
        let (token_id, species, quantity, price, value) = get_token_info(@0x123);
        assert!(token_id == 1, 3);
        assert!(species == SPECIES_MAINE, 4);
        assert!(quantity == 100, 5);
        assert!(price == 25, 6);
        assert!(value == 2500, 7);
    }

    #[test(producer = @0x123)]
    public entry fun test_view_functions(producer: signer) acquires TokenRegistry, LobsterToken {
        create_lobster_token(
            &producer,
            SPECIES_CARIBBEAN,
            50,
            LOCATION_CARIBBEAN_SEA,
            1704067200,
            30
        );

        let (species, quantity, location, harvest_date) = get_harvest_details(@0x123);
        assert!(species == SPECIES_CARIBBEAN, 8);
        assert!(quantity == 50, 9);
        assert!(location == LOCATION_CARIBBEAN_SEA, 10);
        assert!(harvest_date == 1704067200, 11);
    }
}