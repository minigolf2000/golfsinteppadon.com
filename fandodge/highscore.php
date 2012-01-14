<?php
include($_SERVER['DOCUMENT_ROOT'] . "/global/_dbconnect.php");

if ($_POST["checkIfHighScore"]) {
	if ($_SERVER['SERVER_NAME'] != $_SERVER["HTTP_HOST"]) {
		echo $_SERVER['SERVER_NAME'] . "\r\n";
		echo $_SERVER["HTTP_HOST"] . "\r\n";
		echo "YOU SUCK EUI!";
		return;
	}
	
	// Get 10th highest score
	$query = "SELECT MIN(score) AS score FROM (SELECT score FROM `highscore` ORDER BY score DESC LIMIT 10) AS score;";
	
	$results = mysql_query($query);
	$lowestRecord = mysql_fetch_array($results);
	
	echo ($_POST["score"] > $lowestRecord["score"]) ? "yes" : "no";
	return;
}

else if ($_POST["submitHighScore"]) {
	if ($_SERVER['SERVER_NAME'] != $_SERVER["HTTP_HOST"]) {
		echo $_SERVER['SERVER_NAME'] . "\r\n";
		echo $_SERVER["HTTP_HOST"] . "\r\n";
		echo "YOU SUCK EUI!";
		return;
	}
	$query = "SELECT * FROM highscore ORDER BY score LIMIT 1";
	$results = mysql_query($query);
	$lowestRecord = mysql_fetch_array($results);
	if ($_POST["score"] > $lowestRecord["score"]) {
		mysql_query("BEGIN");
		// Remove old record
		//$lowestId = $lowestRecord["id"];
		//$query = "DELETE FROM highscore WHERE id = $lowestId";
		//mysql_query($query);
		// Add new record
		$name = strtoupper($_POST["name"]);
		$score = $_POST["score"];
		$query = "INSERT INTO highscore (name, score) VALUES ('$name', $score)";
		mysql_query($query);
		mysql_query("COMMIT");
	}
	$results = mysql_query("SELECT id FROM highscore WHERE name = '$name' AND score = '$score' LIMIT 1");
	$newRecord = mysql_fetch_array($results);
}

// Show high scores
$query = "SELECT * FROM highscore ORDER BY score DESC LIMIT 10;";
$results = mysql_query($query);

?>
<p id="highscoreCaption">Player<span class="score">Score</span></p>
<ol>
<?php
	while ($row = mysql_fetch_array($results)) {
?>
		<li
		<?php if ($newRecord && $newRecord["id"] == $row["id"]) { ?>
			class="newRecord"
		<?php } ?>
		>
		<?php echo $row["name"] ?> <span class="score"><?php echo $row["score"] ?></span>
		</li>
<?php
	}
?></ol><?php
?>