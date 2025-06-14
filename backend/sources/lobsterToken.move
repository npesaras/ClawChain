module lobster_addr::lobster_token {
    use std::signer;
    use std::string::{Self, String};
    use std::vector;

    // Error codes
    const E_TOKEN_NOT_FOUND: u64 = 1;
    const E_UNAUTHORIZED: u64 = 3;
    const E_INVALID_PRICE: u64 = 4;

    // 1. Define structs for lobster token data
    struct LobsterHarvest has store, copy {
        species: String,
        quantity: u64,
        location: String,
        harvest_date: u64,
        price_per_kg: u64,
        total_value: u64,
    }

    struct LobsterToken has key {
        id: String,
        harvest: LobsterHarvest,
        producer: address,
    }

    struct TokenRegistry has key {
        tokens: vector<String>,
        next_token_id: u64,
    }

    // Predefined lobster species
    const SPECIES_MAINE_LOBSTER: vector<u8> = b"Maine Lobster";
    const SPECIES_CARIBBEAN_LOBSTER: vector<u8> = b"Caribbean Spiny Lobster";
    const SPECIES_ROCK_LOBSTER: vector<u8> = b"Rock Lobster";

    // 2. Initialize the registry for a user
    public entry fun initialize_registry(account: &signer) {
        let registry = TokenRegistry {
            tokens: vector::empty<String>(),
            next_token_id: 1,
        };
        move_to(account, registry);
    }

    // 3. Create a new lobster token
    public entry fun create_lobster_token(
        producer: &signer,
        species: String,
        quantity: u64,
        location: String,
        harvest_date: u64,
        price_per_kg: u64,
    ) acquires TokenRegistry {
        let producer_addr = signer::address_of(producer);
    
        // Ensure registry exists
        if (!exists<TokenRegistry>(producer_addr)) {
            initialize_registry(producer);
        };

        let registry = borrow_global_mut<TokenRegistry>(producer_addr);
        let token_id = string::utf8(b"LOBSTER_");
        string::append(&mut token_id, string::utf8(std::bcs::to_bytes(&registry.next_token_id)));
        
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
        vector::push_back(&mut registry.tokens, token_id);
        registry.next_token_id = registry.next_token_id + 1;
    }

    // 4. View functions
    #[view]
    public fun get_token_info(producer_addr: address): (String, String, u64, u64, u64) acquires LobsterToken {
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
    public fun get_harvest_details(producer_addr: address): (String, u64, String, u64) acquires LobsterToken {
        let token = borrow_global<LobsterToken>(producer_addr);
        (
            token.harvest.species,
            token.harvest.quantity,
            token.harvest.location,
            token.harvest.harvest_date
        )
    }

    #[view]
    public fun get_producer_tokens(producer_addr: address): vector<String> acquires TokenRegistry {
        if (!exists<TokenRegistry>(producer_addr)) {
            return vector::empty<String>()
        };
        let registry = borrow_global<TokenRegistry>(producer_addr);
        registry.tokens
    }

    // Helper function to get predefined species
    #[view]
    public fun get_predefined_species(): vector<String> {
        let species = vector::empty<String>();
        vector::push_back(&mut species, string::utf8(SPECIES_MAINE_LOBSTER));
        vector::push_back(&mut species, string::utf8(SPECIES_CARIBBEAN_LOBSTER));
        vector::push_back(&mut species, string::utf8(SPECIES_ROCK_LOBSTER));
        species
    }

    #[test(producer = @0x123)]
    public entry fun test_create_lobster_token(producer: signer) acquires TokenRegistry, LobsterToken {
        use std::debug;
        
        // Test creating a lobster token
        let species = string::utf8(b"Maine Lobster");
        let quantity = 100;
        let location = string::utf8(b"Maine Coast");
        let harvest_date = 1704067200;
        let price_per_kg = 25;

        debug::print(&string::utf8(b"Creating lobster token..."));
        create_lobster_token(
            &producer,
            species,
            quantity,
            location,
            harvest_date,
            price_per_kg
        );

        // Verify token was created
        assert!(exists<LobsterToken>(@0x123), 1);
        assert!(exists<TokenRegistry>(@0x123), 2);
        
        // Print token info
        let (token_id, token_species, token_quantity, token_price, token_value) = get_token_info(@0x123);
        debug::print(&string::utf8(b"Token created successfully!"));
        debug::print(&string::utf8(b"Token ID: "));
        debug::print(&token_id);
        debug::print(&string::utf8(b"Species: "));
        debug::print(&token_species);
        debug::print(&string::utf8(b"Quantity: "));
        debug::print(&token_quantity);
        debug::print(&string::utf8(b"Price per kg: "));
        debug::print(&token_price);
        debug::print(&string::utf8(b"Total value: "));
        debug::print(&token_value);
    }

    #[test(producer = @0x123)]
    public entry fun test_view_functions(producer: signer) acquires TokenRegistry, LobsterToken {
        use std::debug;
        
        // Create a token first
        let species = string::utf8(b"Caribbean Spiny Lobster");
        let quantity = 50;
        let location = string::utf8(b"Caribbean Sea");
        let harvest_date = 1704067200;
        let price_per_kg = 30;

        create_lobster_token(
            &producer,
            species,
            quantity,
            location,
            harvest_date,
            price_per_kg
        );

        // Test view functions
        let (_token_id, token_species, token_quantity, token_price, token_value) = get_token_info(@0x123);
        assert!(token_species == string::utf8(b"Caribbean Spiny Lobster"), 3);
        assert!(token_quantity == 50, 4);
        assert!(token_price == 30, 5);
        assert!(token_value == 1500, 6); // 50 * 30 = 1500
        
        // Print harvest details
        let (harvest_species, harvest_quantity, harvest_location, harvest_date_retrieved) = get_harvest_details(@0x123);
        debug::print(&string::utf8(b"=== Harvest Details ==="));
        debug::print(&string::utf8(b"Species: "));
        debug::print(&harvest_species);
        debug::print(&string::utf8(b"Quantity: "));
        debug::print(&harvest_quantity);
        debug::print(&string::utf8(b"Location: "));
        debug::print(&harvest_location);
        debug::print(&string::utf8(b"Harvest Date: "));
        debug::print(&harvest_date_retrieved);
    }

    #[test]
    public fun test_predefined_data() {
        use std::debug;
        
        // Test predefined species
        let species = get_predefined_species();
        assert!(vector::length(&species) == 3, 8);
        
        debug::print(&string::utf8(b"=== Predefined Species ==="));
        let i = 0;
        while (i < vector::length(&species)) {
            debug::print(vector::borrow(&species, i));
            i = i + 1;
        };
    }
}