<?php

namespace App\Http\Controllers\API\Customer;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function index()
    {
        $services = Service::with('category')->where('status', 1)->get();
        return response()->json([
            'success' => true,
            'data' => $services
        ]);
    }

    public function show($id)
    {
        $service = Service::with('category')->find($id);
        if (!$service) {
            return response()->json(['success' => false, 'message' => 'Dịch vụ không tồn tại.'], 404);
        }
        return response()->json([
            'success' => true,
            'data' => $service
        ]);
    }
}
