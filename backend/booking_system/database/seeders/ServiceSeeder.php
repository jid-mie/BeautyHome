<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Service;
use App\Models\Category;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        $faceId = Category::where('category_name', 'Chăm sóc da mặt')->first()->category_id;
        $bodyId = Category::where('category_name', 'Chăm sóc cơ thể')->first()->category_id;
        $nailId = Category::where('category_name', 'Làm móng (Nail)')->first()->category_id;
        $hairId = Category::where('category_name', 'Gội đầu dưỡng sinh')->first()->category_id;

        $services = [
            [
                'category_id' => $faceId,
                'service_name' => 'Chăm sóc da cơ bản',
                'price' => 250000,
                'duration' => 60,
                'description' => 'Gồm tẩy trang, rửa mặt, tẩy tế bào chết, massage và đắp mặt nạ.',
                'status' => 1
            ],
            [
                'category_id' => $faceId,
                'service_name' => 'Trị mụn chuyên sâu',
                'price' => 450000,
                'duration' => 90,
                'description' => 'Lấy nhân mụn chuẩn y khoa, sát khuẩn điện tím và chiếu ánh sáng sinh học.',
                'status' => 1
            ],
            [
                'category_id' => $bodyId,
                'service_name' => 'Massage body đá nóng',
                'price' => 500000,
                'duration' => 90,
                'description' => 'Giúp lưu thông máu huyết, giảm căng thẳng mệt mỏi.',
                'status' => 1
            ],
            [
                'category_id' => $nailId,
                'service_name' => 'Combo Cắt da & Sơn Gel',
                'price' => 150000,
                'duration' => 45,
                'description' => 'Làm sạch móng và sơn gel bền đẹp.',
                'status' => 1
            ],
            [
                'category_id' => $hairId,
                'service_name' => 'Gội đầu dưỡng sinh thảo dược',
                'price' => 120000,
                'duration' => 45,
                'description' => 'Sử dụng dầu gội thảo mộc kết hợp massage bấm huyệt.',
                'status' => 1
            ],
        ];

        foreach ($services as $service) {
            Service::create($service);
        }
    }
}
