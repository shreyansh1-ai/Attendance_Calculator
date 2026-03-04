function calculatePercentage(present, total) {
    if (total === 0) return 0;
    return (present / total) * 100;
}

function classesNeeded(present, total, target) {
    let x = 0;
    while (((present + x) / (total + x)) * 100 < target) {
        x++;
    }
    return x;
}

function classesCanSkip(present, total) {
    let x = 0;
    while (((present) / (total + x)) * 100 >= 75) {
        x++;
    }
    return x - 1;
}

function calculate() {

    const subject = document.getElementById("subject").value;
    const total = parseInt(document.getElementById("total").value);
    const present = parseInt(document.getElementById("present").value);

    if (!subject) {
        alert("Please select a subject");
        return;
    }

    if (present > total || total <= 0 || present < 0 || isNaN(total) || isNaN(present)) {
        document.getElementById("result").innerHTML =
            "❌ Invalid input! Please enter correct values.";
        return;
    }

    const percentage = calculatePercentage(present, total).toFixed(2);

    let output = `
        📘 Subject: ${subject}<br>
        📊 Current Attendance: ${percentage}%<br><br>
    `;

    if (percentage < 60) {
        const needed60 = classesNeeded(present, total, 60);
        output += `➡ Attend next <b>${needed60}</b> classes to reach 60%.<br>`;
    } else {
        output += "✅ You have more than 60% attendance.<br>";
    }

    if (percentage < 75) {
        const needed75 = classesNeeded(present, total, 75);
        output += `➡ Attend next <b>${needed75}</b> classes to reach 75%.`;
    } else {

        const skip = classesCanSkip(present, total);

        if (skip > 0) {
            output += `🎉 You can skip <b>${skip}</b> classes and still maintain 75%.`;
        } else {
            output += `⚠ Try not to skip any classes.`;
        }
    }

    document.getElementById("result").innerHTML = output;
}
