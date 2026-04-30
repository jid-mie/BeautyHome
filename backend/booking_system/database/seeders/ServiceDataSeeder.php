<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\Service;
use Illuminate\Support\Facades\DB;

class ServiceDataSeeder extends Seeder
{
    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        Service::truncate();
        Category::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $data = [
            [
                'name' => 'Chăm sóc da mặt (Facial)',
                'image' => '/images/services/facial.png',
                'description' => 'Liệu trình trẻ hóa, trị mụn và dưỡng da chuyên sâu.',
                'services' => [
                    ['name' => 'Aqua Peeling Hàn Quốc', 'price' => 850000, 'duration' => 60, 'desc' => 'Làm sạch sâu lỗ chân lông, hút mụn cám.', 'img' => '/images/services/aqua_peeling.png'],
                    ['name' => 'Trị mụn y khoa Laser', 'price' => 1200000, 'duration' => 90, 'desc' => 'Diệt khuẩn tầng sâu, giảm viêm.', 'img' => '/images/services/laser_acne.png'],
                    ['name' => 'Nâng cơ xóa nhăn RF', 'price' => 1800000, 'duration' => 90, 'desc' => 'Thon gọn gương mặt, xóa nhăn.', 'img' => '/images/services/facial.png'],
                    ['name' => 'Điện di Vitamin C', 'price' => 450000, 'duration' => 45, 'desc' => 'Mờ thâm, sáng da.', 'img' => '/images/services/facial.png'],
                    ['name' => 'Ủ trắng mặt Collagen', 'price' => 700000, 'duration' => 60, 'desc' => 'Dưỡng chất Collagen mịn màng.', 'img' => '/images/services/facial.png'],
                ]
            ],
            [
                'name' => 'Massage & Body Therapy',
                'image' => '/images/services/massage.png',
                'description' => 'Thư giãn tuyệt đối và phục hồi năng lượng.',
                'services' => [
                    ['name' => 'Massage Đá nóng Thụy Điển', 'price' => 650000, 'duration' => 75, 'desc' => 'Thư giãn sâu bằng đá núi lửa.', 'img' => '/images/services/hot_stone.png'],
                    ['name' => 'Tắm trắng phi thuyền', 'price' => 2500000, 'duration' => 120, 'desc' => 'Công nghệ tắm trắng hiện đại.', 'img' => '/images/services/phi_thuyen.png'],
                    ['name' => 'Massage Trị liệu Vai Gáy', 'price' => 450000, 'duration' => 45, 'desc' => 'Giải tỏa đau nhức văn phòng.', 'img' => '/images/services/massage.png'],
                    ['name' => 'Body Massage Aroma', 'price' => 550000, 'duration' => 60, 'desc' => 'Massage nhẹ nhàng tinh dầu.', 'img' => '/images/services/massage.png'],
                    ['name' => 'Foot Massage Herb', 'price' => 350000, 'duration' => 60, 'desc' => 'Ngâm thảo dược truyền thống.', 'img' => '/images/services/foot_massage.png'],
                ]
            ],
            [
                'name' => 'Làm móng (Nail Art)',
                'image' => '/images/services/nails.png',
                'description' => 'Chăm sóc và trang trí móng nghệ thuật.',
                'services' => [
                    ['name' => 'Nối móng đắp bột/Gel', 'price' => 550000, 'duration' => 90, 'desc' => 'Tạo form móng thanh thoát.', 'img' => '/images/services/nail_gel.png'],
                    ['name' => 'Sơn Gel cao cấp', 'price' => 200000, 'duration' => 45, 'desc' => 'Bền màu trên 4 tuần.', 'img' => '/images/services/nails.png'],
                    ['name' => 'Trang trí đính đá', 'price' => 450000, 'duration' => 60, 'desc' => 'Đính charm nghệ thuật.', 'img' => '/images/services/nails.png'],
                    ['name' => 'Chà gót chân làm mịn', 'price' => 150000, 'duration' => 30, 'desc' => 'Loại bỏ tế bào chết chai lì.', 'img' => '/images/services/nails.png'],
                ]
            ],
            [
                'name' => 'Triệt lông (Laser)',
                'image' => '/images/services/laser_hair.png',
                'description' => 'Triệt lông vĩnh viễn công nghệ cao.',
                'services' => [
                    ['name' => 'Triệt lông nách Diode Laser', 'price' => 150000, 'duration' => 15, 'desc' => 'Sạch lông, giảm thâm.', 'img' => '/images/services/laser_hair.png'],
                    ['name' => 'Triệt lông tay/chân', 'price' => 500000, 'duration' => 45, 'desc' => 'Mát lạnh, không đau rát.', 'img' => '/images/services/laser_hair.png'],
                    ['name' => 'Bikini Waxing', 'price' => 800000, 'duration' => 60, 'desc' => 'Sáp nhập khẩu an toàn.', 'img' => '/images/services/laser_hair.png'],
                ]
            ],
            [
                'name' => 'Trang điểm (Makeup)',
                'image' => '/images/services/makeup.png',
                'description' => 'Trang điểm chuyên nghiệp.',
                'services' => [
                    ['name' => 'Trang điểm cô dâu', 'price' => 2500000, 'duration' => 150, 'desc' => 'Bền màu, che khuyết điểm.', 'img' => '/images/services/bridal_makeup.png'],
                    ['name' => 'Trang điểm dự tiệc', 'price' => 600000, 'duration' => 60, 'desc' => 'Phong cách sang trọng.', 'img' => '/images/services/makeup.png'],
                    ['name' => 'Trang điểm kỷ yếu', 'price' => 350000, 'duration' => 45, 'desc' => 'Tự nhiên, trong trẻo.', 'img' => '/images/services/makeup.png'],
                ]
            ],
            [
                'name' => 'Gội đầu dưỡng sinh',
                'image' => '/images/services/hair.png',
                'description' => 'Chăm sóc tóc và da đầu.',
                'services' => [
                    ['name' => 'Gội dưỡng sinh Trung Hoa', 'price' => 250000, 'duration' => 60, 'desc' => 'Bấm huyệt, massage cổ vai gáy.', 'img' => '/images/services/hair.png'],
                    ['name' => 'Phục hồi Keratin', 'price' => 900000, 'duration' => 90, 'desc' => 'Tái tạo tóc hư tổn.', 'img' => '/images/services/hair.png'],
                ]
            ]
        ];

        foreach ($data as $item) {
            $category = Category::create([
                'category_name' => $item['name'],
                'description' => $item['description']
            ]);

            foreach ($item['services'] as $svc) {
                Service::create([
                    'category_id' => $category->category_id,
                    'service_name' => $svc['name'],
                    'price' => $svc['price'],
                    'duration' => $svc['duration'],
                    'description' => $svc['desc'],
                    'image' => $svc['img']
                ]);
            }
        }
    }
}
