<?php

namespace App\CQRS\Commands\Bookings;

class CreateBookingCommand
{
    public function __construct(
        public array $data,
        public int $customerId,
        public array $cart
    ) {}
}
