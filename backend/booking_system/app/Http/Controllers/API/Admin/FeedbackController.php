<?php

namespace App\Http\Controllers\API\Admin;

use App\Http\Controllers\Controller;
use App\Models\Feedback;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Log;

class FeedbackController extends Controller
{
    public function index()
    {
        try {
            $feedback = Feedback::with(['customer', 'booking'])->latest()->get();
            return response()->json([
                'status' => 'success',
                'data' => $feedback
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            Log::error('Admin API request failed.', [
                'controller' => self::class,
                'exception' => $e,
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'Không thể xử lý yêu cầu. Vui lòng thử lại sau.'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
