<?php

$response = array();
$dir = './uploads/';
$urlServer  = isset($_SERVER['HTTPS']) ? 'https://' : 'http://';
$urlServer .= $_SERVER['SERVER_NAME'];
$urlServer .= $_SERVER['REQUEST_URI'];
$urlServer = dirname(dirname($urlServer));

class IdGenerator
{

    private static function nextChar()
    {
        return base_convert(mt_rand(0, 35), 10, 36);
    }

    public static function generate()
    {
        $parts = explode('.', uniqid('', true));

        $id = str_pad(base_convert($parts[0], 16, 2), 56, mt_rand(0, 1), STR_PAD_LEFT)
            . str_pad(base_convert($parts[1], 10, 2), 32, mt_rand(0, 1), STR_PAD_LEFT);
        $id = str_pad($id, strlen($id) + (8 - (strlen($id) % 8)), mt_rand(0, 1), STR_PAD_BOTH);

        $chunks = str_split($id, 8);

        $id = array();
        foreach ($chunks as $key => $chunk) {
            if ($key & 1) {
                array_unshift($id, $chunk);
            } else {
                array_push($id, $chunk);
            }
        }

        $prefix = str_pad(base_convert(mt_rand(), 10, 36), 6, self::nextChar(), STR_PAD_BOTH);
        $id = str_pad(base_convert(implode($id), 2, 36), 19, self::nextChar(), STR_PAD_BOTH);
        $suffix = str_pad(base_convert(mt_rand(), 10, 36), 6, self::nextChar(), STR_PAD_BOTH);

        return $prefix . self::nextChar() . $id . $suffix;
    }
}

if ($_FILES['image']) {
    $fileName = $_FILES["image"]["name"];
    $tempFileName = $_FILES["image"]["tmp_name"];
    $error = $_FILES["image"]["error"];

    if ($error > 0) {
        $response = array(
            "error" => true,
            "msg" => "Error uploading the file!"
        );
    } else {
        $uid = IdGenerator::generate();
        $file_name = $uid."-".$fileName;
        $img_name = strtolower($file_name);
        $upload_img_name = preg_replace('/\s+/', '-', $dir.$img_name);

        $img_url = preg_replace('/\s+/', '-', 'uploads/'.$img_name);
    
        if (move_uploaded_file($tempFileName, $upload_img_name)) {
            $response = array(
                "error" => false,
                "url" => $urlServer."/".$img_url
              );
        } else {
            $response = array(
                "error" => true
            );
        }
    }

} else {
    $response = array(
        "error" => true
    );
}

echo json_encode($response);

