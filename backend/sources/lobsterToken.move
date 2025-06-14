module lobster_addr::lobster_token {
    use std::signer;
    use std::string::{Self, String};
    use std::vector;
    use aptos_framework::timestamp;

    // Error codes
    const E_TOKEN_NOT_FOUND: u64 = 1;
    const E_INSUFFICIENT_QUANTITY: u64 = 2;
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
        sustainability_score: u8,
        certifications: vector<String>,
    }

    struct LobsterToken has key {
        id: String,
        harvest: LobsterHarvest,
        producer: address,
        total_supply: u64,
        available_supply: u64,
        created_at: u64,
        status: String,
    }

    struct TokenRegistry has key {
        tokens: vector<String>,
        next_token_id: u64,
    }

    struct Purchase has store, copy {
        buyer: address,
        quantity: u64,
        amount_paid: u64,
        timestamp: u64,
    }

    struct TokenSales has key {
        purchases: vector<Purchase>,
        total_sold: u64,
        total_revenue: u64,
    }

    // Predefined lobster species
    const SPECIES_MAINE_LOBSTER: vector<u8> = b"Maine Lobster";
    const SPECIES_CARIBBEAN_LOBSTER: vector<u8> = b"Caribbean Spiny Lobster";
    const SPECIES_ROCK_LOBSTER: vector<u8> = b"Rock Lobster";

    // Common certifications
    const CERT_MSC: vector<u8> = b"MSC Certified";
    const CERT_ORGANIC: vector<u8> = b"Organic";
    const CERT_SUSTAINABLE: vector<u8> = b"Sustainable Fishing";

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
        certifications: vector<String>,
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
            sustainability_score: 85, // Default score
            certifications,
        };

        let token = LobsterToken {
            id: token_id,
            harvest,
            producer: producer_addr,
            total_supply: quantity,
            available_supply: quantity,
            created_at: timestamp::now_seconds(),
            status: string::utf8(b"Active"),
        };

        // Store token
        move_to(producer, token);
        
        // Initialize sales tracking
        let sales = TokenSales {
            purchases: vector::empty<Purchase>(),
            total_sold: 0,
            total_revenue: 0,
        };
        move_to(producer, sales);

        // Update registry
        vector::push_back(&mut registry.tokens, token_id);
        registry.next_token_id = registry.next_token_id + 1;
    }

    // 4. Purchase tokens from a producer
    public entry fun purchase_tokens(
        buyer: &signer,
        producer_addr: address,
        quantity: u64,
    ) acquires LobsterToken, TokenSales {
        let buyer_addr = signer::address_of(buyer);
        
        // Get token and verify availability
        let token = borrow_global_mut<LobsterToken>(producer_addr);
        assert!(token.available_supply >= quantity, E_INSUFFICIENT_QUANTITY);
        
        let amount_to_pay = quantity * token.harvest.price_per_kg;
        
        // Update token supply
        token.available_supply = token.available_supply - quantity;
        
        // Record purchase
        let sales = borrow_global_mut<TokenSales>(producer_addr);
        let purchase = Purchase {
            buyer: buyer_addr,
            quantity,
            amount_paid: amount_to_pay,
            timestamp: timestamp::now_seconds(),
        };
        
        vector::push_back(&mut sales.purchases, purchase);
        sales.total_sold = sales.total_sold + quantity;
        sales.total_revenue = sales.total_revenue + amount_to_pay;
    }

    // 5. Update token status (harvest completion, etc.)
    public entry fun update_token_status(
        producer: &signer,
        new_status: String,
    ) acquires LobsterToken {
        let producer_addr = signer::address_of(producer);
        let token = borrow_global_mut<LobsterToken>(producer_addr);
        token.status = new_status;
    }

    // 6. View functions
    #[view]
    public fun get_token_info(producer_addr: address): (String, String, u64, u64, u64, String) acquires LobsterToken {
        let token = borrow_global<LobsterToken>(producer_addr);
        (
            token.id,
            token.harvest.species,
            token.harvest.quantity,
            token.harvest.price_per_kg,
            token.harvest.total_value,
            token.status
        )
    }

    #[view]
    public fun get_available_supply(producer_addr: address): u64 acquires LobsterToken {
        let token = borrow_global<LobsterToken>(producer_addr);
        token.available_supply
    }

    #[view]
    public fun get_sales_info(producer_addr: address): (u64, u64) acquires TokenSales {
        let sales = borrow_global<TokenSales>(producer_addr);
        (sales.total_sold, sales.total_revenue)
    }

    #[view]
    public fun get_harvest_details(producer_addr: address): (String, u64, String, u64, vector<String>) acquires LobsterToken {
        let token = borrow_global<LobsterToken>(producer_addr);
        (
            token.harvest.species,
            token.harvest.quantity,
            token.harvest.location,
            token.harvest.harvest_date,
            token.harvest.certifications
        )
    }

    #[view]
    public fun get_sustainability_score(producer_addr: address): u8 acquires LobsterToken {
        let token = borrow_global<LobsterToken>(producer_addr);
        token.harvest.sustainability_score
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

    // Helper function to get common certifications
    #[view]
    public fun get_common_certifications(): vector<String> {
        let certs = vector::empty<String>();
        vector::push_back(&mut certs, string::utf8(CERT_MSC));
        vector::push_back(&mut certs, string::utf8(CERT_ORGANIC));
        vector::push_back(&mut certs, string::utf8(CERT_SUSTAINABLE));
        certs
    }

    #[test_only]
    use std::debug;

    #[test(producer = @0x123, buyer = @0x456)]
    public entry fun test_create_lobster_token(producer: signer, buyer: signer) acquires TokenRegistry {
        // Test creating a lobster token
        let species = string::utf8(b"Maine Lobster");
        let quantity = 100;
        let location = string::utf8(b"Maine Coast");
        let harvest_date = 1704067200;
        let price_per_kg = 25;
        let certifications = vector::empty<String>();
        vector::push_back(&mut certifications, string::utf8(b"MSC Certified"));

        create_lobster_token(
            &producer,
            species,
            quantity,
            location,
            harvest_date,
            price_per_kg,
            certifications
        );

        // Verify token was created
        assert!(exists<LobsterToken>(@0x123), 1);
        assert!(exists<TokenSales>(@0x123), 2);
        assert!(exists<TokenRegistry>(@0x123), 3);
    }

    #[test(producer = @0x123, buyer = @0x456)]
    public entry fun test_purchase_tokens(producer: signer, buyer: signer) acquires TokenRegistry, LobsterToken, TokenSales {
        // First create a token
        test_create_lobster_token(producer, buyer);

        // Test purchasing tokens
        purchase_tokens(&buyer, @0x123, 20);

        // Verify purchase was recorded
        let available_supply = get_available_supply(@0x123);
        assert!(available_supply == 80, 4); // 100 - 20 = 80

        let (total_sold, total_revenue) = get_sales_info(@0x123);
        assert!(total_sold == 20, 5);
        assert!(total_revenue == 500, 6); // 20 * 25 = 500
    }

    #[test(producer = @0x123)]
    public entry fun test_view_functions(producer: signer) acquires TokenRegistry, LobsterToken {
        // Create a token first
        let species = string::utf8(b"Caribbean Spiny Lobster");
        let quantity = 50;
        let location = string::utf8(b"Caribbean Sea");
        let harvest_date = 1704067200;
        let price_per_kg = 30;
        let certifications = vector::empty<String>();
        vector::push_back(&mut certifications, string::utf8(b"Organic"));
        vector::push_back(&mut certifications, string::utf8(b"Sustainable Fishing"));

        create_lobster_token(
            &producer,
            species,
            quantity,
            location,
            harvest_date,
            price_per_kg,
            certifications
        );

        // Test view functions
        let (token_id, token_species, token_quantity, token_price, token_value, token_status) = get_token_info(@0x123);
        assert!(token_species == string::utf8(b"Caribbean Spiny Lobster"), 7);
        assert!(token_quantity == 50, 8);
        assert!(token_price == 30, 9);
        assert!(token_value == 1500, 10); // 50 * 30 = 1500

        let sustainability_score = get_sustainability_score(@0x123);
        assert!(sustainability_score == 85, 11);

        let available_supply = get_available_supply(@0x123);
        assert!(available_supply == 50, 12);
    }

    #[test]
    public fun test_predefined_data() {
        // Test predefined species
        let species = get_predefined_species();
        assert!(vector::length(&species) == 3, 13);

        // Test predefined certifications
        let certs = get_common_certifications();
        assert!(vector::length(&certs) == 3, 14);
    }

    #[test(producer = @0x123)]
    #[expected_failure(abort_code = E_INSUFFICIENT_QUANTITY)]
    public entry fun test_insufficient_quantity_failure(producer: signer) acquires TokenRegistry, LobsterToken, TokenSales {
        // Create a token with quantity 10
        create_lobster_token(
            &producer,
            string::utf8(b"Test Lobster"),
            10,
            string::utf8(b"Test Location"),
            1704067200,
            25,
            vector::empty<String>()
        );

        // Try to purchase more than available (should fail)
        purchase_tokens(&producer, @0x123, 15); // This should abort with E_INSUFFICIENT_QUANTITY
    }
}
