var PAGE_DATA = Object;
const CONTAINER_ID = "#content";

function remove_tags(str) {
    if ((str===null) || (str===''))
        return false;
    else
        str = str.toString();

    return str.replace( /(<([^>]+)>)/ig, '');
}

function calculate_padding(width_of_content, padding_char="~") {
    var screenwidth_in_chars = Math.ceil($(window).width() / Math.ceil($("#charwidth").width()));
    var padding_amt = (screenwidth_in_chars - width_of_content) / 2;
    return padding_amt;
}

function print_to_page(block_of_text) {
    var header = "";  // The final text to be put on the page
    var padding = " ".repeat(Math.min(0, calculate_padding(block_of_text.content_width)));
    var lines = block_of_text.plain_content.split("\n");
    for (var i=0; i<lines.length; i++){
        header += padding+lines[i]+padding+"<br/>"
    }
    $(CONTAINER_ID).html(header)
}

function longest_line(block_of_text) {
    var maxwidth = 0;
    var lines = block_of_text.split("\n");
    for (var i=0; i<lines.length; i++){
        if (lines[i].length > maxwidth){ maxwidth = lines[i].length };
    };
    return maxwidth;
}

$(document).ready(function() {
    $.ajax({
        async:   false,
        url:     'README.txt',
        success: function (data){
            PAGE_DATA = {
                plain_content: String(data),
                content_width: longest_line(remove_tags(data)),
            }
        }
    });
    print_to_page(PAGE_DATA);  // Format the contents of the file to be centred, then display on page.
});

window.onresize = function() {
    print_to_page(PAGE_DATA);
};
