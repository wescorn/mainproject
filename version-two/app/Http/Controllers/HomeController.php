<?php

namespace App\Http\Controllers;
use Symfony\Component\HttpFoundation\Request;

class HomeController extends Controller
{
    public function show(Request $request) {

        return view('welcome');
    }
}

