<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['category_name' => 'Chăm sóc da mặt', 'description' => 'Các dịch vụ massage, nặn mụn, dưỡng da mặt.'],
            ['category_name' => 'Chăm sóc cơ thể', 'description' => 'Dịch vụ massage body, tẩy tế bào chết toàn thân.'],
            ['category_name' => 'Làm móng (Nail)', 'description' => 'Sơn gel, cắt da, nối móng nghệ thuật.'],
            ['category_name' => 'Nối mi & Chân mày', 'description' => 'Dịch vụ nối mi, xăm/điêu khắc chân mày.'],
            ['category_name' => 'Gội đầu dưỡng sinh', 'description' => 'Dịch vụ gội đầu kết hợp massage cổ vai gáy.'],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
